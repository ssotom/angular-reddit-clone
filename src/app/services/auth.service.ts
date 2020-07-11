import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../services/baseURL';
import { Signup } from '../shared/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASEURL: string;

  constructor(private baseURL: BaseURL, private http: HttpClient) {
    this.BASEURL = baseURL.getBaseURL() + 'auth';
  }

  signup(signup: Signup): Observable<any> {
    return this.http.post(this.BASEURL + '/signup', signup);
  }

}
