import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  write(message: any, description: string = 'Info: ') {
    // temporary comment
    console.log(description, message);
  }
}
