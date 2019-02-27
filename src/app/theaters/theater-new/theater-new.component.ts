import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterService } from '../../services/theater.service';
import { ITheater } from '../../models/theater';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-theater-new',
  templateUrl: './theater-new.component.html',
  styleUrls: ['./theater-new.component.css']
})
export class TheaterNewComponent implements OnInit {

  public theater={} as ITheater;

  constructor(
    private theaterService: TheaterService, 
    private _router: Router
  ) { }

  ngOnInit() {
  }

    createTheater(theater) {

      this.theaterService.createTheater(theater).subscribe(res => {
      this._router.navigate(['/theaters']);

    }, err => {
      alert("Error in creating movie");
    });
  }

}
