import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';    

@Component({
  selector: 'app-movies-best-sellers',
  templateUrl: './movies-best-sellers.component.html',
  styleUrls: ['./movies-best-sellers.component.css']
})
export class MoviesBestSellersComponent implements OnInit {
  moviesBestSellers;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesBestSellers = this.moviesService.getMoviesBestSellers();
  }

}
