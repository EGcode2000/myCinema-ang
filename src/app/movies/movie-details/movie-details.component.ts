import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

import { MoviesService } from '../../services/movies.service';
import { ShowService } from '../../services/show.service';

import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: string;
  movie: any;
  movieShowsSchedule: any;
  movieHourList: any;
  selectedDate: string;
  youtubeUrl;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private moviesService: MoviesService,
    private showService: ShowService,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get("id");
    //alert(this.movieId);
    this.getMovie();
  }

  getMovie() {
    this.moviesService.getMovieDetails(this.movieId).subscribe(res => {
      //starting with a check to see if the movie is not displaying and if the user is not admin
      // console.log("res movies");
      // console.log(res);
      // console.log('this.usersService.getIsAdmin()');
      // console.log(this.usersService.getIsAdmin());
      // console.log('res.isDisplaying');
      // console.log(res.isDisplaying);
      if (!this.usersService.getIsAdmin() && !res.isDisplaying) {
        //no permission 
        //alert('no premission!');
        this._router.navigate(['/']);
      } else {
        //alert('premission');
        //the user got permission to watch this page
        this.movie = res;
        this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.movie.youtubeTrailer);
        this.getMovieSchedule();
      }
    }, err => {
      alert("we did not get movie");
    });
  }

  getMovieSchedule() {
    this.showService.getMovieSchedule(this.movieId).subscribe(res => {
      this.movieShowsSchedule = res;
      console.log(this.movieShowsSchedule);
      //alert("we got movie successfully");

      if (!this.movieHourList) {
        /*if this.movieHourList is undefined then that means it's 
        the initinal loading. so we will display todays shows */

        console.log("firstDayInSchedule");
        if (typeof this.movieShowsSchedule[0] != "undefined") {
          //see https://stackoverflow.com/questions/909003/getting-the-first-index-of-an-object
          let firstDayInSchedule = Object.keys(this.movieShowsSchedule[0])[0];
          if (firstDayInSchedule) {
            this.showHours(firstDayInSchedule);
          }
        }
      }
    }, err => {
      alert("we did not get the movie schedule");
    });
  }


  getDateKey(obj) {
    //i have this function in another component. check if i can make it only 1. maybe in service. talk to roi 
    console.log([Object.keys(obj)[0], moment(Object.keys(obj)[0]).format('DD/MM/YYYY')]);
    return [Object.keys(obj)[0], moment(Object.keys(obj)[0]).format('DD/MM/YYYY')];
  }

  deleteMovie() {
    this.moviesService.deleteMovie(this.movieId).subscribe(res => {
      console.log(res);
      //alert("movie deleted successfully");
      this._router.navigate(['/movies']);
    }, err => {
      alert("movie is still alive!");
    });

  }


  showHours(date) {
    console.log(date);
    this.selectedDate = date;
    this.movieShowsSchedule.forEach(schedule => {
      console.log(schedule);
      console.log('shit2');
      console.log(schedule[date]);
      if (schedule[date]) {
        this.movieHourList = schedule[date];
        console.log(this.movieHourList);
      }
    });
  }
  getTimeKey(obj) {
    return [Object.keys(obj)[0], obj[Object.keys(obj)[0]]];
  }

  onClickShow(showId) {
    this.showService.getShowDetails(showId).subscribe(show => {
      console.log(show);
      this.ordersService.updateChoosenShow(show);
      this._router.navigate(['/orders/choose-seats']);
    });

  }

}
