import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-movies-carusela',
  templateUrl: './movies-carusela.component.html',
  styleUrls: ['./movies-carusela.component.css']
})
export class MoviesCaruselaComponent implements OnInit {

  @Input() movieListArray: Movie[];

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  loadinImage(){
    // becuase loading the first image takes the most time
    //we will show hte 'loading spinner' until it will finish loading 
    this.loadingService.updateIsLoading(false);
  }

}
