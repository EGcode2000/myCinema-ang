import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { Observable } from 'rxjs'; 
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';   
import * as moment from 'moment';

@Component({
  selector: 'app-show-next',
  templateUrl: './show-next.component.html',
  styleUrls: ['./show-next.component.css']
})
export class ShowNextComponent implements OnInit {
  public shows;
  time: string;

  constructor(
    private showService: ShowService,    
    private _router: Router, 
    private ordersService: OrdersService, 
    ) { }

  ngOnInit() {
    //this.shows = this.showService.getComingShows();
    this.showService.getComingShows().subscribe(showRespornd=>{
      //alert('got it');
      console.log("next shows");
      console.log(showRespornd);
      this.shows=showRespornd;
      //alert('workin');
      console.log(this.shows);
    })

  }

  getTime(dateTime){  
    return moment(dateTime).format("HH:mm MM/DD/YYYY");
  }

  onClickShow(showId) {
    this.showService.getShowDetails(showId).subscribe(show => {
      console.log(show);
      this.ordersService.updateChoosenShow(show);
      this._router.navigate(['/orders/choose-seats']);
    });

  }

}
