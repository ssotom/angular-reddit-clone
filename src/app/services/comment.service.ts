import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseURL } from './base-URL';
import { Comment } from 'src/app/shared/comment';
import { ErrorResponseService } from './error-response.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private errorResponseService: ErrorResponseService,
    private http: HttpClient) {
    this.BASEURL = baseURL.getBaseURL() + 'comment';
  }

  getAllCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.BASEURL + '/by-post/' + postId);
  }

  getAllCommentsByUser(username: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.BASEURL + '/by-user/' + username);
  }

  postComment(comment: Comment): Observable<any> {
    return this.http.post(this.BASEURL, comment)
      .pipe(catchError(this.errorResponseService.handleError));
  }

}
