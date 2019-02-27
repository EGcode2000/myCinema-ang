import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterService } from '../../services/theater.service';
import { ITheater } from '../../models/theater';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.css']
})
export class TheaterFormComponent implements OnInit {
  theaterForm: FormGroup;
  @Input() theater: ITheater;
  @Output() submitedTheater: EventEmitter<ITheater> = new EventEmitter<ITheater>();
  
  constructor(
    private theaterService: TheaterService, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.theaterForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'rows': new FormControl(null, [Validators.required]),
      'columns': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.theaterForm.invalid) {
      return;
    }
    this.submitedTheater.emit(this.theater);
}

}
