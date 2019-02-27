import { Component, OnInit,AfterContentInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';    
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list-display',
  templateUrl: './movie-list-display.component.html',
  styleUrls: ['./movie-list-display.component.css']
})
export class MovieListDisplayComponent implements OnInit, AfterContentInit {

  @Input() movies: Movie[];
  genreList;
  userFilter: any = { title: '', genreList: {}};

  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(){
    this.moviesService.getGenresList().subscribe(res=>{
      this.genreList=res;
    });
  }

  ngAfterContentInit() {
    console.log('check here');
    console.log(this.movies);
    if (!this.movies){
      console.log('we use service for movies'); 
      this.moviesService.getMovies().subscribe(res=>{
        this.movies=res;
      });
    }
    
  }

  fillterAcordingToGenre(genreId: string = null){
    if (!genreId){
      //all genres
      this.userFilter.genreList= {};
    }else{
      //specific genre
      this.userFilter.genreList={ $or: [genreId] };
    }
  }

}
