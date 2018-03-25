import { CoordinateService } from './../service/coordinate.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state: String = '';
  public colNumber;
  public rowNumber;

  public coordinate = {
    old: {
      x: null,
      y: null
    },
    new: {
      x: null,
      y: null
    },
    state: ''
  };

  counter = 0;

  lastPosition;

  constructor(private _service: CoordinateService, private route: Router) {
  }

  ngOnInit() {
    this._service.currentMessage.subscribe((message) => {
      console.log(message);
      // si la page est actualisé sur /home
      if (message.grid_size.row === null) {
        this.route.navigate(['/welcome']);
      }

      this.colNumber = message.grid_size.col;
      this.rowNumber = message.grid_size.row;

      this.coordinate.new.x = +message.begin.col;
      this.coordinate.new.y = +message.begin.row;
      console.log(this.coordinate);

      // Default N = O   this.counter = 0
      if (message.begin.direction[0] === 'E') {
        this.counter = 1;
      }
      if (message.begin.direction[0] === 'W') {
        this.counter = 3;
      }
      if (message.begin.direction[0] === 'S') {
        this.counter = 2;
      }
      this.getDirectionImage();
    });
  }

  TranslateCombi(combination) {
    this.lastPosition = false;
    // Vérifie si les ordres donnés sont bien autorisés
    combination = combination.toUpperCase();
    const ordersAllowed = ['A', 'D', 'G'];
    for (let i = 0; i < combination.length; i++) {
      if (!ordersAllowed.includes(combination[i])) {
        alert('order not allowed (A: Avancer / G: pivote Gauche / D: pivote Droite)');
        return;
      }
    }


    const regle = ['this.coordinate.new.y--', 'this.coordinate.new.x++',
      'this.coordinate.new.y++', 'this.coordinate.new.x--'];

    combination = combination.split('');

    if (combination[0] === 'D') {
      this.counter++;
      if (this.counter === 4) {
        this.counter = 0;
      }
    } else if (combination[0] === 'G') {
      this.counter--;
      if (this.counter === -4) {
        this.counter = 0;
      }
    } else if (combination[0] === 'A') {
      this.coordinate.old.x = this.coordinate.new.x;
      this.coordinate.old.y = this.coordinate.new.y;

      if (this.counter < 0) {
        this.counter += 4;
      }

      eval(regle[this.counter]);

    }

    this.getDirectionImage();

    combination.splice(0, 1);

    console.log(this.coordinate);

    if (combination.length !== 0) {
      setTimeout(() => {
        this.TranslateCombi(combination.join(''));
      }, 500);
    } else {
      this.lastPosition = this.coordinate.new;
    }

  }

  getDirectionImage() {
    if (this.counter === 0) {
      this.coordinate.state = '';
    }
    if (this.counter === 1 || this.counter === -3) {
      this.coordinate.state = 'east';
    }
    if (this.counter === 2 || this.counter === -2) {
      this.coordinate.state = 'south';
    }
    if (this.counter === 3 || this.counter === -1) {
      this.coordinate.state = 'west';
    }
  }
}

