import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserLoginDto} from "../entity/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION = 'authenticatedUser';
  private url = environment.apiBaseUrl;
  private userLoginDto = {};
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): UserLoginDto {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+":"+password)});
    this.http.get<UserLoginDto>(`${this.url}/login`, {headers,responseType:'text' as 'json'}).subscribe(response => {
        this.userLoginDto = response;
        this.registerLogin(username,password);
    });
    return this.userLoginDto;
  }

  registerLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION, username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION);
  }

  getLoggedInUser() {
    let loggedInUser = sessionStorage.getItem(this.USER_NAME_SESSION);
    if (loggedInUser === null) return false
    return true
  }



}
