import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CoordinateService {

  private messageSource = new BehaviorSubject<any>( 
    {
      grid_size: {
        row: null,
        col: null
      },
      begin: {
        row: null,
        col: null,
        direction: ''
      }
    });
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  sendSize(message: any) {
    this.messageSource.next(message);
  }
}
