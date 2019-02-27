import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  public movies: Movie[];
  userFilter: any = { title: '' };

  constructor(
    private moviesService: MoviesService,
    private _router: Router,
  ) {
  }


  ngOnInit() {
    this.moviesService.getMoviesAdmin().subscribe(res => {
      this.movies = res;
    });
  }

  deleteMovie(movieId) {
    this.moviesService.deleteMovie(movieId).subscribe(res => {
      console.log(res);
      //alert("movie deleted successfully");
      this.moviesService.getMoviesAdmin().subscribe(res => {
        this.movies = res;
      });
    }, err => {
      alert("movie is still alive!");
    });

  }

}
