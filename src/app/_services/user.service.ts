import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_entities/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }
  
  private apiServerUrl = environment.apiBaseUrl;

  getPublicContent(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/test/all`, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/test/user`, { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/test/mod`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/test/admin`, { responseType: 'text' });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/users/profile/${username}`, httpOptions);
  }
  
  getUserById(userid: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/users/${userid}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/users`);
  }

  updateUserProfile(username: string, firstname: string, lastname: string, age: string, biography: string): Observable<any> {
    if (biography ==  '') {
      biography = 'Parlez-nous un peu de vous ..';
    }
    return this.http.put(`${this.apiServerUrl}/users/profile`, {
      username,
      firstname,
      lastname,
      age,
      biography
    });
  }

  updatePassword(username: string, old_passwd: string, new_passwd: string): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/users/profile/password`, {
      username,
      old_passwd,
      new_passwd,
    });
  }

  updateAvatar(username: string, avatar: string) {
    return this.http.put(`${this.apiServerUrl}/users/profile/avatar`, {
      username,
      avatar,
    });
  }

  enableUser(id: number): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/users/${id}/enable`, {
      id
    });
  }

  disableUser(id: number): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/users/${id}/disable`, {
      id
    });
  }
}