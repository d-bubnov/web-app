import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  write(message: any, description: string = 'Info: ') {
    console.log(description, message);
  }
}
