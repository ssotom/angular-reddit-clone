import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorResponseService {

  constructor() { }

  public handleError(response: any) {
    return throwError(response.error.errors);
  }

}
