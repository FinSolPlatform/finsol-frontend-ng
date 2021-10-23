import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.post(`${this.apiServerUrl}/api/auth/signin`, {
      username,
      password
    }, httpOptions);
  }

  reset(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/api/auth/reset`, { email });
  }
  register (firstname: string, lastname: string, age: string, email: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api/auth/signup`, {
      firstname,
      lastname,
      age,
      email,
      username,
      password,
    }, httpOptions);
  }
}
