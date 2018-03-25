import { Component, OnInit, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit, DoCheck {


  @Input()
  col: number;

  @Input()
  row: number;

  @Input()
  coordinateInit;

  board = [];

  constructor() {
  }

  ngOnInit() {

    for (let i = 0; i < this.row; i++) {
      this.board.push([]);
    }

    this.board.forEach(element => {
      for (let y = 0; y < this.col; y++) {
        element.push('');
      }
    });

  }

  ngDoCheck() {
    console.log(this.coordinateInit);
    // To stop the hoover when he goes out of the arrays
    if (this.coordinateInit.new.y === -1) {
      this.coordinateInit.new.y = 0;
    }

    if (this.coordinateInit.new.y === this.row) {
      this.coordinateInit.new.y = this.row - 1;
    }

    if (this.coordinateInit.new.x === -1) {
      this.coordinateInit.new.x = 0;
    }

    if (this.coordinateInit.new.x === this.col) {
      this.coordinateInit.new.x = this.col - 1;
    }


    // To avoid error
    // if (this.coordinateInit.new.y !== this.coordinateInit.old.y ||
    //   this.coordinateInit.new.x !== this.coordinateInit.old.x) {


    // If condition to avoid error when game starting => can t set property of null
    if ((this.coordinateInit.old.y && this.coordinateInit.old.x) !== null) {
      this.board[this.coordinateInit.old.y][this.coordinateInit.old.x] = '';
    }

    if ((this.coordinateInit.new.y && this.coordinateInit.new.x) !== null) {
      // global style.scss .hoover
      this.board[this.coordinateInit.new.y][this.coordinateInit.new.x] =
        `<img class="hoover ${this.coordinateInit.state}"  src="./assets/hoover-img.jpg">`;
    }
  }

  // }



}
