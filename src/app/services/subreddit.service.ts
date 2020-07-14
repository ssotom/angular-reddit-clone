import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from './base-URL';
import { Subreddit } from '../shared/subreddit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private http: HttpClient) {
    this.BASEURL = baseURL.getBaseURL() + 'subreddit';
  }

  getAllSubreddits(): Observable<Subreddit[]> {
    return this.http.get<Subreddit[]>(this.BASEURL);
  }

}
