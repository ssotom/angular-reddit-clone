import { Injectable } from '@angular/core';
import { BaseURL } from './base-URL';
import { HttpClient } from '@angular/common/http';
import { ErrorResponseService } from './error-response.service';
import { catchError } from 'rxjs/operators';
import { Vote } from '../shared/vote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private errorResponseService: ErrorResponseService,
    private http: HttpClient) {
    this.BASEURL = baseURL.getBaseURL() + 'vote';
  }

  vote(vote: Vote): Observable<any> {
    return this.http.post(this.BASEURL, vote)
    .pipe(catchError(this.errorResponseService.handleError));
  }
  
}
