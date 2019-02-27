import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterService } from '../../services/theater.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theater-details',
  templateUrl: './theater-details.component.html',
  styleUrls: ['./theater-details.component.css']
})
export class TheaterDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
  
