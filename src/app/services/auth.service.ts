import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from './base-URL';
import { ErrorResponseService } from './error-response.service';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequest } from '../shared/signup';
import { LoginRequest, LoginResponse } from '../shared/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private http: HttpClient,
    private localStorage: LocalStorageService, private errorResponseService: ErrorResponseService) {
    this.BASEURL = baseURL.getBaseURL() + 'auth';
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(this.BASEURL + '/signup', signupRequest)
    .pipe(catchError(this.errorResponseService.handleError));
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(this.BASEURL + '/login', loginRequest)
      .pipe(
        map(response => {
          this.localStorage.store('token', response.token);
          this.localStorage.store('username', response.username);
          this.localStorage.store('refreshToken', response.refreshToken);
          this.localStorage.store('expiresAt', response.expiresAt);
          return true;
        })
      )
      .pipe(catchError(this.errorResponseService.handleError));
  }

  refreshToken() {
    const refreshToken = {
      refreshToken: this.getRefreshToken(),
    }
    return this.http.post<LoginResponse>(this.BASEURL + '/refresh-token', refreshToken)
      .pipe(tap(response => {
        this.localStorage.store('token', response.token);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getJwtToken() {
    return this.localStorage.retrieve('token');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

}
