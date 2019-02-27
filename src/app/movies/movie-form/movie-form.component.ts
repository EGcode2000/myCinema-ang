import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { NgForm } from '@angular/forms';
import { Movie } from '../../models/movie';
//this is for easy handeling localhost url
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  @Input() movie: Movie;
  @Input() type: string;
  @Input() edit: boolean = false;

  @Output() submitedMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  public genreList: object = {};


  @ViewChild('f') movieForm: NgForm;
  uploaderWidePic: FileUploader = new FileUploader({ url: environment.backEndUrl + '/upload', itemAlias: 'widePic' })
  uploaderPosterPic: FileUploader = new FileUploader({ url: environment.backEndUrl + '/upload', itemAlias: 'posterPic' });
  
  isPosterPicUploaded: boolean = false;
  isWidePicUploaded: boolean = false;
  isUploaded: boolean = false;
  constructor(
    private moviesService: MoviesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.genreList = this.moviesService.getGenresList();
    this.movie.isDisplaying = false; //initializing a checkbox
    //event to check if the file was uploaded. 
    this.uploaderWidePic.onCompleteItem = (fileItem, response, status, headers) => {
      if (status === 200) {
        console.log('file uploded successfully');
        this.movie['wideImagePath'] = environment.backEndUrl + '/files/' + response;
        this.isWidePicUploaded = true;
        //if both file were upload - > create the movie
        this.checkIfDoneUploadindPictures();
      }
    }
    this.uploaderPosterPic.onCompleteItem = (fileItem, response, status, headers) => {
      if (status === 200) {
        console.log('uploaderPosterPic uploded successfully');
        this.movie['posterImagePath'] = environment.backEndUrl + '/files/' + response;
        this.isPosterPicUploaded = true;
        //if both file were upload - > create the movie
        this.checkIfDoneUploadindPictures();
      }
    }
  }

  
  checkIfDoneUploadindPictures() {
    if (this.isPosterPicUploaded && this.isWidePicUploaded) {
      //both pictures were uploaded - > now we can cerate the new movie

      //this.movie['youtubeTrailer'] = 'https://www.youtube.com/embed/' + this.movie['youtubeTrailer'];
      console.log('creating movie...');
      if (this.isUploaded === false) {
        this.isUploaded = true;
        //this.createMovie();
        this.submitedMovie.emit(this.movie);
      }
    }

  }

  onSubmitMovie() {
    console.log(this.movieForm);
    //first we start with uploading the image.
    //if succefull we create the Movie
    if (this.movieForm.valid) {
      //alert("chekc is valid");
      this.uploaderWidePic.uploadAll();
      this.uploaderPosterPic.uploadAll();
    } else {
      //alert("chekc is not valid!");
    }
  }

}
