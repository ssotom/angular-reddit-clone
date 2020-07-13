import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../services/baseURL';
import { ErrorResponseService } from '../services/error.response.service';
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

}
