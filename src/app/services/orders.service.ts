import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IOrder } from '../models/order';
import { IShow } from '../models/show';
//this is for easy handeling localhost url
import { environment } from '../../environments/environment';


@Injectable()
export class OrdersService {

  orderUrl = environment.backEndUrl + '/api/orders/';
  
  private showSource = new BehaviorSubject({});
  choosenShow = this.showSource.asObservable();
  
  constructor(private http: HttpClient) { }

      // Create a new order
  createOrder(order): Observable<IOrder> {
    return this.http.post<IOrder>(this.orderUrl, order);
  }
  // Return the orders list
  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.orderUrl);
  }
  // Return 1 order details
  getOrderDetails(orderId: string): Observable<IOrder> {
    return this.http.get<IOrder>(this.orderUrl + '/' + orderId);
  }
  //edit order
  editOrder(order: any): Observable<IOrder> {
    return this.http.put<IOrder>(this.orderUrl, order);
  }
  // Return 1 order details
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(this.orderUrl + '/' + orderId);
  }

  updateChoosenShow(show: IShow) {
    this.showSource.next(show);
    console.log(show);
  }
}