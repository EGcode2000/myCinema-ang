import { Component, OnInit } from '@angular/core';
import { ShowNextComponent } from './../shows/show-next/show-next.component';
import { QuickOrderComponent } from './../orders/quick-order/quick-order.component';
import { MovieListDisplayComponent } from './../movies/movie-list-display/movie-list-display.component';
import { MoviesBestSellersComponent } from './../movies/movies-best-sellers/movies-best-sellers.component';
import { MoviesService } from '../services/movies.service';
import { MoviesCaruselaComponent } from './../movies/movies-carusela/movies-carusela.component';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { LoadingService } from './../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieListArray: Movie[];
  constructor(
    private moviesService: MoviesService,
    private loadingService: LoadingService

  ) {
    this.loadingService.updateIsLoading(true);
    //i'm putting it in constuctor and not in ngOnIninit
    //becuase lots of child component need it fast
    this.moviesService.getMovies().subscribe(res => {
      console.log('res');
      console.log(res);
      this.movieListArray = res;
    });
  }

  ngOnInit() {
  }

}
