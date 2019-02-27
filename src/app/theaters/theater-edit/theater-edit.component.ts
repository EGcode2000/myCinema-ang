import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterService } from '../../services/theater.service';
import { ITheater } from '../../models/theater';

@Component({
  selector: 'app-theater-edit',
  templateUrl: './theater-edit.component.html',
  styleUrls: ['./theater-edit.component.css']
})
export class TheaterEditComponent implements OnInit {
  public editTheater: ITheater;
  theaterId: string;
  constructor(
    private route: ActivatedRoute,
    private theaterService: TheaterService, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.theaterId = this.route.snapshot.paramMap.get("id");
    this.getTheater();
  }

  getTheater(){
    this.theaterService.getTheaterDetails(this.theaterId).subscribe(res => {
      this.editTheater = res;
    }, err => {
      alert("we did not get the theater");
    });
  }
  
  onEditTheater(theater) {

    this.theaterService.editTheater(theater).subscribe(res => {
    this._router.navigate(['/theaters']);

  }, err => {
    alert("Error while creating theater");
  });
}

}
