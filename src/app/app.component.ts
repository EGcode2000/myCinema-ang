import { Component,OnInit,OnDestroy, AfterViewInit} from '@angular/core';
import { UsersService } from './services/users.service';
import { Subscription } from "rxjs";
import * as moments from 'moment';

import { LoadingService } from './services/loading.service';

import { AuthGuard } from './services/auth.guard';
import { 
  Router, NavigationStart, NavigationCancel, NavigationEnd 
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userIsAuthenticated=false;
  userIsAdmin=false;
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;
  public isLoading: boolean;

  constructor( 
    private loadingService: LoadingService, 
    private userService: UsersService, 
    private router: Router,

  ) {
  }
  ngOnInit() {
    this.loadingService.isLoading.subscribe((res) => {
      this.isLoading = res;
    });
    this.userService.autoAuthUser();
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.userIsAdmin = this.userService.getIsAdmin();

    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        //alert('updated logging in!!');
        //console.log(this.userIsAuthenticated);
      });

      this.adminListenerSubs = this.userService
      .getAdminStatusListener()
      .subscribe(isAdmin => {
        this.userIsAdmin = isAdmin;
        //alert('updated admin!!');
        //console.log('updated admin in istener:');
        //console.log(this.userIsAdmin);
      });
  }

  onLogout() {
    this.userService.logout();
  }
  onLoginClick(){
    // if the user press on 'login' directly
    // we need to reset the returnurl back to defult 
    this.userService.updateReturnUrl('/');
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();

   }

  }

