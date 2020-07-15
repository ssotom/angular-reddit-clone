import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from './base-URL';
import { Subreddit } from '../shared/subreddit';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponseService } from './error-response.service';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private errorResponseService: ErrorResponseService,
    private http: HttpClient) {
    this.BASEURL = baseURL.getBaseURL() + 'subreddit';
  }

  getAllSubreddits(): Observable<Subreddit[]> {
    return this.http.get<Subreddit[]>(this.BASEURL);
  }

  createSubreddit(subredditModel: Subreddit): Observable<any> {
    return this.http.post(this.BASEURL,subredditModel)
      .pipe(catchError(this.errorResponseService.handleError));
  }

}
