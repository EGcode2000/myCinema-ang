import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})

export class MovieNewComponent implements OnInit {
  
  public newMovie = {} as Movie;


  constructor(
    private moviesService: MoviesService,
    private _router: Router
  ) {
  }

  ngOnInit() {

  }

  createMovie(newMovie) {
    console.log(this.newMovie["genreList"]);
    this.moviesService.createMovie(newMovie).subscribe(res => {
      this._router.navigate(['/movies']);
    }, err => {
      alert("Error while creating a movie");
    });
  }

}
