import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from './base-URL';
import { Post, PostRequest } from '../shared/post';
import { catchError } from 'rxjs/operators';
import { ErrorResponseService } from './error-response.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private errorResponseService: ErrorResponseService,
    private http: HttpClient) {
    this.BASEURL = baseURL.getBaseURL() + 'post';
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.BASEURL);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.BASEURL + '/' + id);
  }

  createPost(post: PostRequest): Observable<any> {
    return this.http.post(this.BASEURL, post)
      .pipe(catchError(this.errorResponseService.handleError));
  }

}
