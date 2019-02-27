import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShow } from '../models/show';
//this is for easy handeling localhost url
import { environment } from '../../environments/environment';

@Injectable()
export class ShowService {

  showUrl = environment.backEndUrl + '/api/shows/';

  constructor(private http: HttpClient) { }

  // Create a new Show
  createShow(Show: IShow): Observable<IShow> {
    return this.http.post<IShow>(this.showUrl, Show);
  }
  // Return the Shows list
  getShows(): Observable<IShow[]> {
    return this.http.get<IShow[]>(this.showUrl);
  }
  // Return the Shows list

  getComingShows(): Observable<IShow[]> {
    //alert(this.showUrl + 'coming-shows');
    return this.http.get<IShow[]>(this.showUrl + '/' + 'coming');
  }
  // Return 1 Show details
  getShowDetails(showId): Observable<IShow> {
    return this.http.get<IShow>(this.showUrl + '/' + showId);
  }
  // Return 1 Show details
  getMovieSchedule(movieId): Observable<any> {
    return this.http.get<any[]>(this.showUrl + '/schedule/' + movieId);
  }
  //edit Show
  editShow(Show: any): Observable<IShow> {
    return this.http.put<IShow>(this.showUrl, Show);
  }
  // Return 1 Show details
  deleteShow(showId): Observable<IShow> {
    return this.http.delete<IShow>(this.showUrl + '/' + showId);
  }

}
