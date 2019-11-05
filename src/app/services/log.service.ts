import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  /**
   * Log message with description to console
   * @param description description of message
   * @param message message body
   */
  log(description: string, message: any) {
    if (environment.logging) {
      console.log(description, message);
    }
  }

  /**
   * Log information message to console
   * @param message message to log in console
   */
  info(message: string) {
    if (environment.logging) {
      // tslint:disable-next-line:no-console
      console.info(`Info: ${message}`);
    }
  }

  /**
   * Log error data to console
   * @param error error entity
   */
  error(error: any) {
    if (environment.logging) {
      // tslint:disable-next-line:no-console
      console.error('Error: ', error);
    }
  }
}
