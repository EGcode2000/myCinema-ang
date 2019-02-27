import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { Observable } from 'rxjs'; 
import { TheaterMapDirective } from './../../directive/theater-map.directive';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  public showId: string;
  public show: any;
  remaingSeats: number; 

  constructor(
    private route: ActivatedRoute, 
    private _router: Router ,
    private showService: ShowService
  ) { }

  ngOnInit() {
    this.showId=this.route.snapshot.paramMap.get("id");
    //alert(this.showId);
    this.getShow();
  }

  
objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
  }
  return strMap;
}

  getShow() {
    this.showService.getShowDetails(this.showId).subscribe(res => {
    this.show = res; 
    console.log(this.show.showTakenSeats);
    this.remaingSeats = (this.show.theaterInfo[0].rows * this.show.theaterInfo[0].columns) - Object.keys(this.show.showTakenSeats).length;

    //alert("we got show successfully");
      console.log(this.show);
    }, err => {
    alert("we did not get show");
    });
    }

    getTime(dateString){
      return moment(dateString).format('HH:mm MM/DD/YYYY');
    }

}
