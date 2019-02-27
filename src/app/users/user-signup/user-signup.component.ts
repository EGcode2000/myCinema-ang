import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserNew } from '../../models/user-new';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  public signupUser = {} as IUserNew;
  signupForm: FormGroup;
  errorMsg:string;

  constructor(private route: ActivatedRoute, private _router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, this.passwordLength]),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
    });
  }

  //just testing custom validation in angular - there is no check like this in the backend
  passwordLength(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      if (control.value.length < 8) {
        return { 'passwordLength': true };
      }
    }
    return null;
  }
  onSubmitRegister() {
    if (this.signupForm.invalid) {
      return;
    }
    this.errorMsg=null;
    //console.log(this.signupForm);
    
    this.userService.signupUser(this.signupUser).subscribe(res => {
      //console.log(res);
      //alert("user registerd");
      this._router.navigate(["/login"]);
    }, (err) => {
      //alert("error registering");
      //alert(err.error.message);
      this.errorMsg=err.error.message;
    });
  }

}
