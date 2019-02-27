import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';    
import { UsersService } from '../../services/users.service';
import { IUserInfo } from '../../models/user-info';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersList: IUserInfo[];
  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res=>{
      this.usersList = res;
    });
    console.log(this.usersList);
  }

}
