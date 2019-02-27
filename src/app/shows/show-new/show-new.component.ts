import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { TheaterService } from '../../services/theater.service';
import { IShow } from '../../models/show';
import { ITheater } from '../../models/theater';
import { Movie } from '../../models/movie';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

//import * as moment from 'moment';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-show-new',
  templateUrl: './show-new.component.html',
  styleUrls: ['./show-new.component.css']
})

export class ShowNewComponent implements OnInit {
  
  public newShow = {} as IShow;
  public errorMsg:string;

  constructor(
    private showService: ShowService, 
    private _router: Router, 
  ) { }

  ngOnInit() {
  }

  createShow(show) {
    this.showService.createShow(show).subscribe(res => {
      this._router.navigate(['/shows']);
    }, err => {
      console.log(err);
      this.errorMsg = err.error.message;
      //alert("Error in creating show");
    });
  }

}
