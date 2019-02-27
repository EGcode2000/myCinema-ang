import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITheater } from '../models/theater';
import { environment } from '../../environments/environment';

@Injectable()
export class TheaterService {

  theaterUrl = environment.backEndUrl + '/api/theaters/';

  constructor(private http: HttpClient) { }

    // Create a new theater
  createTheater(theater: ITheater): Observable<ITheater> {
    return this.http.post<ITheater>(this.theaterUrl, theater);
  }
  // Return the Theaters list
  getTheaters(): Observable<ITheater[]> {
    return this.http.get<ITheater[]>(this.theaterUrl);
  }
  // Return 1 theater details
  getTheaterDetails(theateId): Observable<ITheater> {
    return this.http.get<ITheater>(this.theaterUrl + '/' + theateId);
  }
  //edit theater
  editTheater(theater: any): Observable<ITheater> {
    return this.http.put<ITheater>(this.theaterUrl, theater);
  }
  // Return 1 theater details
  deleteTheater(theateId): Observable<any> {
    return this.http.delete<any>(this.theaterUrl + '/' + theateId);
  }

}
