import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserLogin } from '../../models/user-loggin';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public loginUser = {} as IUserLogin;
  loginForm: FormGroup;
  errorMsg: string;

  constructor(
    private route: ActivatedRoute, 
    private _router: Router, 
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
    this.userService.errorLogin.subscribe(error => {
      this.errorMsg=error;
    });
  }

  onSubmitLogin() {
    console.log(this.loginForm);

    if (this.loginForm.invalid) {
      return;
    }
    this.userService.loginUser(this.loginUser);
  }
}
