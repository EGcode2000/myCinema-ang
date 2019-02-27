import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Observable } from 'rxjs';
import { TheaterMapDirective } from './../../directive/theater-map.directive';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { IOrder } from '../../models/order';
import { IShow } from '../../models/show';


@Component({
  selector: 'app-order-seats',
  templateUrl: './order-seats.component.html',
  styleUrls: ['./order-seats.component.css']
})
export class OrderSeatsComponent implements OnInit {

  newOrder = {} as IOrder;
  showObject: any;
  maxTicketsAvailable: number;
  numberOfTickets: number = 1;
  showDateTime: string;
  validMessage: string = null;
  errorMsg: string;

  constructor(
    private ordersService: OrdersService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.ordersService.choosenShow.subscribe(show => {
      this.showObject = show;
      if (Object.keys(this.showObject).length === 0 && this.showObject.constructor === Object) {
        //if we did not get a show -> naviagte to home
        this._router.navigate(['/']);
      }
      this.maxTicketsAvailable = (this.showObject.theaterInfo[0].rows * this.showObject.theaterInfo[0].columns) - Object.keys(this.showObject.showTakenSeats).length;
      this.showDateTime = moment(this.showObject.dateTime).format('dddd, MMMM Do YYYY, HH:mm');
    });
  }

  orderVlidation(): boolean {
    let orderValid = false;
    this.validMessage = null;
    if (this.numberOfTickets != this.newOrder.ticketsPositions.length) {
      orderValid = false;
      this.validMessage = "Number of tickets and actual tickets choosen are not equal!"
      return orderValid;
    }
    if (this.numberOfTickets <= 0) {
      orderValid = false;
      return orderValid;
    }
    return true;
  }

  onSeatChange(choosenSeatsArray) {
    // value will be the emitted value by the child
    this.newOrder['ticketsPositions'] = choosenSeatsArray;
    if (this.validMessage && (this.numberOfTickets == this.newOrder.ticketsPositions.length)) {
      this.validMessage = null;
    }
    //console.log(this.newOrder['ticketsPositions']);
  }

  onClickOrder() {
    let isValidOrder = this.orderVlidation();
    if (isValidOrder) {
      //will start with sorting ticketsPositions according to rows and columns 
      this.newOrder['ticketsPositions'].sort((a, b) => {
        return a[0] - b[0] || a[1] - b[1];
      })
      this.newOrder["numberOfTickets"] = this.numberOfTickets;
      this.newOrder["_ShowId"] = this.showObject._id;
      this.ordersService.createOrder(this.newOrder).subscribe(res => {
        this._router.navigate(['/orders/' + res._id]);
      }, err => {
        this.errorMsg = err.error.message;
      });
    }
  }

}
