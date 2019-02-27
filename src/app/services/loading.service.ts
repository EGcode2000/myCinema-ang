import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {

  private isLoadingSource = new BehaviorSubject<boolean>(false);
  isLoading = this.isLoadingSource.asObservable();
  
  constructor() { }

  updateIsLoading(isLoading: boolean) {
    this.isLoadingSource.next(isLoading);
  }

}

