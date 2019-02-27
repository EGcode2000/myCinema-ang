import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ShowService } from '../../services/show.service';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Movie } from '../../models/movie';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.css']
})
export class QuickOrderComponent implements OnInit {
  
  @Input() movieList: Movie[];
  movieShowsSchedule: any;
  selectedMovie: string="";
  selectedDate: string="";
  movieHourList: any;
  selectedShowId: string="";
  selectedShow:any;
  maxTicketsAvailable:any=1;
  quickOrderForm: FormGroup;


  constructor(
    private moviesService: MoviesService, 
    private showService: ShowService, 
    private ordersService: OrdersService, 
    private _router: Router
  ) { }

    
  ngAfterContentInit() {
    console.log('check here');
    console.log(this.movieList);
    if (!this.movieList){
      console.log('we use service for movies'); 
      this.moviesService.getMovies().subscribe(res=>{
        this.movieList=res;
      });
    }
    
  }
  ngOnInit() {
    this.moviesService.getMovies().subscribe(res=>{
      this.movieList=res;
    });
        //form
        this.quickOrderForm = new FormGroup({
          'selectMovie': new FormControl(null, [Validators.required]),
          'selectDate': new FormControl(null, [Validators.required]),
          'selectTime': new FormControl(null, [Validators.required]),
        });
  }

  onChangeSelectMovie() {
    //reseting defualt values
    this.selectedDate="";
    this.selectedShowId="";
    this.movieHourList = [];

    //until here

    this.movieShowsSchedule = this.showService.getMovieSchedule(this.selectedMovie);
  }

  onChangeSelectDate() {
    //reseting defualt values
    this.selectedShowId="";
    this.movieHourList = [];
    //until here

    this.movieShowsSchedule.subscribe(showsScheduleArray => {
      console.log(showsScheduleArray);
      showsScheduleArray.forEach(schedule => {
        console.log('shit2');
        console.log(schedule[this.selectedDate]);
        if(schedule[this.selectedDate]){
          this.movieHourList=schedule[this.selectedDate];
        }
      }); 
    }
    );
  }

  getDateKey(obj) {
    return [Object.keys(obj)[0], moment(Object.keys(obj)[0]).format('DD/MM/YYYY')];
  }
  getTimeKey(obj) {
    return [Object.keys(obj)[0],obj[Object.keys(obj)[0]]];
  }
  onChangeSelectTime(){
    this.showService.getShowDetails(this.selectedShowId).subscribe(show =>{
      console.log(show);
      this.selectedShow=show;
  });
    console.log(this.selectedShow);
  }
  

  
  orderClick(){
    if (this.quickOrderForm.invalid) {
      return;
    }

      //alert('order! ' + this.selectedShowId);
      console.log(this.selectedShow);
      this.ordersService.updateChoosenShow(this.selectedShow);
      this._router.navigate(['/orders/choose-seats']);
  
  }
}
