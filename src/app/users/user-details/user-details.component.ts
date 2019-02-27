import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';    
import { UsersService } from '../../services/users.service';
import { IUserInfo } from '../../models/user-info';
import { IOrder } from '../../models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  
  userId: string;
  user = {} as IUserInfo;
  orderObj = {} as IOrder;


  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.getUser();
  }
  
  
  getUser() {
    this.usersService.getUserDetails(this.userId).subscribe(res => {

      if (!this.usersService.getIsAdmin()) {
        //no permission 
        //alert('no premission!');
        this._router.navigate(['/']);
      } else {
        //alert('premission');
        //the user got permission to watch this page
        this.user = res;
        this.getUserOrders();
      }
    }, err => {
      alert("we did not get movie");
    });
  }

  getUserOrders(){
    console.log(this.user);
  }

}
