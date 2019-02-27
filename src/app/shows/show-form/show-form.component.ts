import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { TheaterService } from '../../services/theater.service';
import { IShow } from '../../models/show';
import { ITheater } from '../../models/theater';
import { Movie } from '../../models/movie';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {
  
  @Input() show: IShow;
  @Output() submitedShow: EventEmitter<IShow> = new EventEmitter<IShow>();
  @Input() errorMsg:string;

  public movieList: Observable<Movie[]>;
  public theaterList: Observable<ITheater[]>;
  public date: string;
  public time: string;
  showForm: FormGroup;


  constructor(
    private showService: ShowService, 
    private _router: Router, 
    private moviesService: MoviesService, 
    private theaterService: TheaterService
  ) { }

  ngOnInit() {
    //defulat valuel
    this.show._MovieId = "";
    this.show._TheaterId = "";
    //get list
    this.movieList = this.moviesService.getMovies();
    this.theaterList = this.theaterService.getTheaters();
    //form
    this.showForm = new FormGroup({
      'selectMovie': new FormControl(null, [Validators.required]),
      'selectTheater': new FormControl(null, [Validators.required]),
      'showDate': new FormControl(null, [Validators.required]),
      'showTime': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.showForm.invalid) {
      return;
    }
    this.show["dateTime"] = new Date(this.date + ' ' + this.time);
    this.submitedShow.emit(this.show);
}

}
