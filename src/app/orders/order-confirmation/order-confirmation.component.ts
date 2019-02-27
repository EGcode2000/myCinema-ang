import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { TheaterMapDirective } from './../../directive/theater-map.directive';
import { IOrder } from '../../models/order';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})

export class OrderConfirmationComponent implements OnInit {

  orderId: string;
  orderObj = {} as IOrder;
  ticketPositionsStrings;
  takenSeatsObj: object;
  loadPage: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.getOrder();
  }

  getOrder() {
    //get order details and also check premmision
    //i'm doing it here, rather then in authgured, in order to save a http call to server
    this.ordersService.getOrderDetails(this.orderId).subscribe(res => {
      if (this.usersService.getIsAdmin() || (this.usersService.getUserId() === res._UserId)) {
        //the user got permission to watch this page
        this.orderObj = res;
        this.initTicketsVariabels();
      } else {
        //no permission 
        this._router.navigate(['/']);
      }
    }, err => {
      alert("we did not get the order");
    });
  }

  initTicketsVariabels() {
    this.loadPage = true;
    this.ticketPositionsStrings = [];
    this.takenSeatsObj = {};
    this.orderObj.ticketsPositions.forEach(element => {
      this.ticketPositionsStrings.push("Row: " + (element[0] + 1) + " Seat: " + (element[1] + 1));
      this.takenSeatsObj[element[0] + '-' + element[1]] = this.orderObj._id;
    });
  }
  getTime(dateString) {
    return moment(dateString).format('HH:mm MM/DD/YYYY');
  }
  onDoneClick() {
    this._router.navigate(['/']);
  }

}
