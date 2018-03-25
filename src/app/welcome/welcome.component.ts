import { CoordinateService } from './../service/coordinate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private _service: CoordinateService, private route: Router) { }

  ngOnInit() {
  }

  validate(sizeX, sizeY, coordX, coordY, direction) {
    // Vérifie si tout est rempli d'abord puis "else" vérifie si la direction est autorisé
    if (!coordX || !coordY || !direction) {
      alert('all input must be filled (x: Number / y: Number / direction(N: North / E: East / W: West /S: South ))');
      return;
    } else {
      const lettersAllowed = ['N', 'E', 'W', 'S'];
      direction = direction.toUpperCase();
      if (!lettersAllowed.includes(direction[0])) {
        alert('direction not allowed (N: North / E: East / W: West /S: South )');
        return;
      }
    }

    sizeX = +sizeX;
    sizeY = +sizeY;
    coordX = +coordX;
    coordY = +coordY;

    this._service.sendSize({
      grid_size: {
        row: sizeX,
        col: sizeY
      },
      begin: {
        row: coordX,
        col: coordY,
        direction: direction
      }
    });
    this.route.navigate(['/home']);
  }

}
