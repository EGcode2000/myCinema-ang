import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { Observable } from 'rxjs';    
import { IShow } from '../../models/show';
import * as moment from 'moment';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  public shows: IShow[];
  time: string;
  userFilter: any = { _id: ''};

  constructor(
    private showService: ShowService
  ) { }

  ngOnInit() {
    this.showService.getShows().subscribe(res=>{
      this.shows = res;
    });
    console.log(this.shows);
  }

  getTime(dateTime){  
    return moment(dateTime).format("MM/DD/YYYY HH:mm");
  }

}
