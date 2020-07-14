import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { BaseURL } from './base-URL';
import { Post } from '../shared/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private http: HttpClient) {
    this.BASEURL = baseURL.getBaseURL() + 'post';
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.BASEURL);
  }

}
