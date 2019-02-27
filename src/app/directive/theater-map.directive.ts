import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appTheaterMap]'
})
export class TheaterMapDirective {

  canvas;
  @Input() showTakenSeats: object;
  @Input() rowsNumber: number;
  @Input() colsNumber: number;
  @Input() numberOfTickets: number = 0;
  @Output() onSeatChange: any = new EventEmitter<any>();

  choosenSeatsArray = [];
  alreadyChoosenIndex: number = null;
  takenSeats = new Image();
  choosenSeats = new Image();
  availableSeats = new Image();
  spriteSeats = new Image();
  imageWidth: number;
  imageHeight: number;
  ctx;


  constructor(private el: ElementRef) {
    this.canvas = this.el.nativeElement;
  }

  ngOnChanges(changes) {
    this.checkNumTicketsVsChoosenTickets('onChange');
  }
  ngOnInit() {


    this.ctx = this.canvas.getContext("2d");
    this.initWidthHeight();

    this.spriteSeats.src = "/assets/images/seatssprite.png"


    this.spriteSeats.onload = () => {
      this.drawSeats();
      //show pointer only if we in order tickets display
      if (this.numberOfTickets > 0) {
        this.canvas.style.cursor = 'pointer';
      }
    };

    window.onresize = (event) => {
      this.initWidthHeight();
      this.drawSeats();
    };


    this.canvas.onclick = (e) => {
      if (this.numberOfTickets === 0) {
        return;
      }
      let pos = this.windowToCanvas(e.clientX, e.clientY);
      let row = Math.floor(pos.y / this.imageHeight);//for the same purpuse as parseInt
      let col = Math.floor(pos.x / this.imageWidth);

      //alert(row + "-" + col);
      if (this.showTakenSeats.hasOwnProperty(row + '-' + col)) {
        return;
      }

      if (this.checkIfChoosen(row, col)) {
        //this seat is choosen
        
        this.ctx.drawImage(this.spriteSeats, 30, 0, 30, 30, col * this.imageWidth, row * this.imageHeight, this.imageWidth, this.imageHeight);
        
        //im using splice to remove an elemnt from an array
        // without changing it length 
        //see https://stackoverflow.com/a/5767335
        this.choosenSeatsArray.splice(this.alreadyChoosenIndex, 1);
        this.onSeatChange.emit(this.choosenSeatsArray);
        return;
      }
      this.checkNumTicketsVsChoosenTickets('onChoose');
      this.choosenSeatsArray.push([row, col]);
      this.ctx.drawImage(this.spriteSeats, 0, 0, 30, 30, col * this.imageWidth, row * this.imageHeight, this.imageWidth, this.imageHeight);
      this.onSeatChange.emit(this.choosenSeatsArray);
    }



  }
  windowToCanvas(x, y) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: x - rect.left,
      y: y - rect.top
    };
  }
  checkIfChoosen(row, col) {
    this.alreadyChoosenIndex = null;
    if (this.choosenSeatsArray.length > 0) {
      return !this.choosenSeatsArray.every((element, index) => {
        if (element[0] == row && element[1] == col) {
          this.alreadyChoosenIndex = index;
          return false;
        }
        return true;
      });
    } else {
      return false;
    }
  }
  /*
  //old function
  checkIfChoosen2(row, col) {
    if (this.choosenSeatsArray.length > 0) {
      let isChosen = false;
      this.choosenSeatsArray.forEach(element => {
        if (element[0] == row && element[1] == col) {
          // alert('choosen');
          isChosen = true;
        }
      });
      return isChosen;
    } else {
      return false;
    }
  }
  */
  initWidthHeight() {
    this.canvas.width = 0.75 * window.innerWidth;
    this.canvas.height = 0.75 * window.innerHeight;

    this.imageHeight = this.canvas.height / this.rowsNumber;
    this.imageWidth = this.canvas.width / this.colsNumber;
  }

  checkNumTicketsVsChoosenTickets(eventType: string = 'onChoose') {
    let numberOfSeatsChoosen;
    if (eventType === 'onChoose') {
      //if we call this function after we choose a seat we should
      //add 1 to length
      numberOfSeatsChoosen = this.choosenSeatsArray.length + 1;
    } else {
      numberOfSeatsChoosen = this.choosenSeatsArray.length;
    }
    if (numberOfSeatsChoosen > this.numberOfTickets) {
      this.choosenSeatsArray.forEach(element => {
        this.ctx.drawImage(this.spriteSeats, 30, 0, 30, 30, element[1] * this.imageWidth, element[0] * this.imageHeight, this.imageWidth, this.imageHeight);
      });
      this.choosenSeatsArray = [];
    }
  }

  drawSeats() {
    for (let i = 0; i < this.rowsNumber; i++) {
      for (let j = 0; j < this.colsNumber; j++) {

        if (this.showTakenSeats.hasOwnProperty(i + '-' + j)) {
          //taken
          this.ctx.drawImage(this.spriteSeats, 60, 0, 30, 30, j * this.imageWidth, i * this.imageHeight, this.imageWidth, this.imageHeight);
        } else if (this.checkIfChoosen(i, j)) {
          this.ctx.drawImage(this.spriteSeats, 0, 0, 30, 30, j * this.imageWidth, i * this.imageHeight, this.imageWidth, this.imageHeight);
        } else {

          //not taken
          this.ctx.drawImage(this.spriteSeats, 30, 0, 30, 30, j * this.imageWidth, i * this.imageHeight, this.imageWidth, this.imageHeight);
        }

      }
    }
  }
}
