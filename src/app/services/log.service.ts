import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  write(message: any, description: string = 'Info: ') {
    if (environment.logging) {
      console.log(description, message);
    }
  }
}
