import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl: string;

  constructor(private http: HttpClient) { 
    this.apiServerUrl = environment.apiBaseUrl;
  }

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/register`, user);
  }
  
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public findUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/${userId}`);
  }
}
