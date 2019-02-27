import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { IUserInfo } from '../models/user-info';

@Injectable()
export class UsersService {

  userUrl = environment.backEndUrl + '/api/users/';

  // Return the Users list
  getUsers(): Observable<IUserInfo[]> {
    return this.http.get<IUserInfo[]>(this.userUrl);
  }
  // Return 1 user details
  getUserDetails(userId): Observable<IUserInfo> {
    return this.http.get<IUserInfo>(this.userUrl + '/' + userId);
  }

  //this is for passing an error to the login form
  private errorSource = new BehaviorSubject(null);
  errorLogin = this.errorSource.asObservable();
  //untill here

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private adminStatusListener = new Subject<boolean>();
  private isAdmin = false;
  private userIdStatusListener = new Subject<boolean>();
  private userId = null;

  private tokenTimer;

  /* 
  the follwing variables are for storing the 'return url' in case
  we need to login first 
  */
  returnUrl = '/';
  constructor(private http: HttpClient, private _router: Router) { }

  updateReturnUrl(returnUrl: string = '/') {
    this.returnUrl = returnUrl;
  }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getIsAdmin() {
    return this.isAdmin;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

  getUserIdStatusListener() {
    return this.userIdStatusListener.asObservable();
  }


  // signUp
  signupUser(newUser: object): Observable<any> {

    return this.http.post(environment.backEndUrl + '/auth/signup/', newUser);
  }



  // login
  loginUser(loginInfo: object) {
    console.log(loginInfo);
    this.http.post(environment.backEndUrl + '/auth/login/', loginInfo).subscribe((respond) => {
      let tokenRes = respond['token'];
      let expiresInDuration = respond['expiresInDuration'];
      if (tokenRes) {
        this.token = tokenRes;
        console.log(respond['expiresInDuration']);
        this.setAuthTimer(expiresInDuration);
        console.log('token!' + this.token);
        this.setValuesAfterGoodLogin();
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(tokenRes, expirationDate);
        //save returnUrl in temp
        let navigateTo = this.returnUrl;
        //reset and update back to '/';
        this.updateReturnUrl('/');
        //navigate to the original 'returnUrl'
        this._router.navigate([navigateTo]);
        return null;
      }
    }, (err => {
      // i did all of the login logic in this service for simplicity
      // if there is an error -> pass it to the login component! 
      this.errorSource.next(err.error.message);
    }));
  }

  logout() {
    //alert('starting logging out');
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.userIdStatusListener.next(null);
    this.isAdmin = false;
    this.adminStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this._router.navigate(["/"]);
  }

  setValuesAfterGoodLogin() {
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    const helper: JwtHelper = new JwtHelper();
    const decodedToken = helper.decodeToken(this.token);
    console.log('decoded token:');
    console.log(decodedToken);
    this.isAdmin = decodedToken.isAdmin;
    this.userId = decodedToken.id;
    console.log('this.isAdmin');
    console.log(this.isAdmin);
    this.adminStatusListener.next(this.isAdmin);
    console.log('this.userId');
    console.log(this.userId);
    this.userIdStatusListener.next(this.userId);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiresIn / 1000);
      this.setValuesAfterGoodLogin();
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
