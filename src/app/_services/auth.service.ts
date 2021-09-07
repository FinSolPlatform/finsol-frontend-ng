import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private apiServerUrl = environment.apiBaseUrl;

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  reset(email: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'reset', { email });
  }
  register (firstname: string, lastname: string, age: string, email: string, username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstname,
      lastname,
      age,
      email,
      username,
      password,
    }, httpOptions);
  }
}
