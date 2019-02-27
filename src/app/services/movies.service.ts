import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
//this is for easy handeling localhost url
import { environment } from '../../environments/environment';

@Injectable()
export class MoviesService {

  moviesUrl = environment.backEndUrl + '/api/movies/';
  genreUrl = environment.backEndUrl + '/api/genres/'

  constructor(private http: HttpClient) { }
  // Create a new movie
  createMovie(movie: Movie): Observable<Movie> {
    let movies = this.http.post<Movie>(this.moviesUrl, movie);
    return movies;
  }
  // Return the movies list
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

    // Return the movies list for admin (with movies that are not displaing)
    getMoviesAdmin(): Observable<Movie[]> {
      return this.http.get<Movie[]>(this.moviesUrl + "/movieListAdmin");
    }
    
  // Return the best sellers movies list
  getMoviesBestSellers(): Observable<any> {
    return this.http.get<any>(this.moviesUrl + "/best-sellers2");
  }

  // Return 1 movie details
  getMovieDetails(movieId): Observable<Movie> {
    return this.http.get<Movie>(this.moviesUrl + '/' + movieId);
  }
  
  //edit movie
  editMovie(movie: any): Observable<Movie> {
    return this.http.put<any>(this.moviesUrl, movie);
  }
  // delete movie
  deleteMovie(movieId): Observable<any> {
    return this.http.delete<any>(this.moviesUrl + '/' + movieId);
  }

    // get genres list
    getGenresList(): Observable<any> {
      return this.http.get<any>(this.genreUrl);
    }
}
