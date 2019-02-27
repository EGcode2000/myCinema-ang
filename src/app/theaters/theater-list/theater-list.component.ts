import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../../services/theater.service';
import { Observable } from 'rxjs';
import { ITheater } from '../../models/theater';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.css']
})
export class TheaterListComponent implements OnInit {

  public theaters: ITheater[];

  constructor(private theaterService: TheaterService) { }

  ngOnInit() {
    this.getAllTheaters();
  }

  getAllTheaters() {
    this.theaterService.getTheaters().subscribe(res => {
      this.theaters = res;
    });
  }

  deleteTheater(theaterId) {
    this.theaterService.deleteTheater(theaterId).subscribe(res => {
      console.log(res);
      //alert("movie deleted successfully");
      this.getAllTheaters();
    }, err => {
      alert("Theater is still alive!");
    });

  }

}
