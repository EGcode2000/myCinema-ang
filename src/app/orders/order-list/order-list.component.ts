import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Observable } from 'rxjs';    
import { IOrder } from '../../models/order';
import * as moment from 'moment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orders: IOrder[];
  userFilter: any = { _id: ''};

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getOrders().subscribe(res =>{
      this.orders = res;
    });
  }

  getTime(dateString){
    return moment(dateString).format('HH:mm MM/DD/YYYY');
  }

  deleteOrder(orderId) {
    this.ordersService.deleteOrder(orderId).subscribe(res => {
      console.log(res);
      //alert("movie deleted successfully");
      this.ordersService.getOrders().subscribe(res =>{
        this.orders = res;
      });
    }, err => {
      alert("movie is still alive!");
    });

  }

}
