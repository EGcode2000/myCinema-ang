import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { NgForm } from '@angular/forms';
import { Movie } from '../../models/movie';
//this is for easy handeling localhost url
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  genreList: object = {};
  uploaderWidePic: FileUploader = new FileUploader({ url: environment.backEndUrl + '/upload', itemAlias: 'widePic' })
  uploaderPosterPic: FileUploader = new FileUploader({ url: environment.backEndUrl + '/upload', itemAlias: 'posterPic' });
  @ViewChild('f') movieForm: NgForm;
  uploader: FileUploader;
  movieId: string;
  editedMovie: Movie;
  isPosterPicUploaded: boolean = false;
  isWidePicUploaded: boolean = false;
  isUploaded: boolean = false;
  widePicTempPath: string;
  posterPicTempPath: string;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get("id");
    this.getMovie();
    this.genreList = this.moviesService.getGenresList();
    //event to check if the file was uploaded. 
    this.uploaderWidePic.onCompleteItem = (fileItem, response, status, headers) => {
      if (status === 200) {
        console.log('file uploded successfully');
        this.editedMovie['wideImagePath'] = environment.backEndUrl + '/files/' + response;
        this.isWidePicUploaded = true;
        //if both file were upload - > create the movie
        this.checkIfDoneUploadindPictures();
      }
    }
    this.uploaderPosterPic.onCompleteItem = (fileItem, response, status, headers) => {
      if (status === 200) {
        console.log('uploaderPosterPic uploded successfully');
        this.editedMovie['posterImagePath'] = environment.backEndUrl + '/files/' + response;
        this.isPosterPicUploaded = true;
        //if both file were upload - > create the movie
        this.checkIfDoneUploadindPictures();
      }
    }

  }

  onSubmitEdit() {

    //this.uploaderWidePic.uploadAll();
    //this.uploaderPosterPic.uploadAll();
    console.log(this.widePicTempPath + ' - ' + this.posterPicTempPath);
    if (this.widePicTempPath && this.posterPicTempPath) {
      //widePicTempPath && posterPicTempPath were uploaded
      alert('with 2 picture');
      this.uploaderWidePic.uploadAll();
      this.uploaderPosterPic.uploadAll();
    } else if (this.widePicTempPath && !this.posterPicTempPath) {
      //just widePicTempPath was uploaded
      alert('just wide');
      this.uploaderWidePic.uploadAll();
    } else if (!this.widePicTempPath && this.posterPicTempPath) {
      //just posterPicTempPath was uploaded
      alert('just poster');
      this.uploaderPosterPic.uploadAll();
    } else {
      //no picture - > go edit
      alert('edit');
      this.editMovie();
    }
  }
  getMovie() {
    this.moviesService.getMovieDetails(this.movieId).subscribe(res => {
      this.editedMovie = res;
      //alert("we got movie successfully");

    }, err => {
      alert("we did not get movie");
    });
  }
  editMovie() {
    this.moviesService.editMovie(this.editedMovie).subscribe(res => {
      //alert("we edited movie successfully");
      this._router.navigate(['/movies', res._id]);

    }, err => {
      alert("we did not edit movie");
    });
  }


  checkIfDoneUploadindPictures() {
    if (this.isPosterPicUploaded && this.isWidePicUploaded && this.widePicTempPath && this.posterPicTempPath) {
      //both pictures were uploaded - > now we can cerate the new movie

      //this.editedMovie['youtubeTrailer'] = 'https://www.youtube.com/embed/' + this.editedMovie['youtubeTrailer'];
      console.log('creating movie...');
      if (this.isUploaded === false) {
        this.isUploaded = true;
        this.editMovie();
      }
    } else {
      this.editMovie();
    }

  }

}
