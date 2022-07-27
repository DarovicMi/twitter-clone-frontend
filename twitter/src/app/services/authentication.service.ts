import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {User, UserLoginDto} from "../entity/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION = 'authenticatedUser';
  private url = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router) { }
  id: number;
  username: string;
  password: string; 

  public login(username: string, password: string): any {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+":"+password)});
    this.http.get<UserLoginDto>(`${this.url}/login`, {headers}).subscribe(response => {
        this.id = response.id;
        this.username = username;
        this.password = password;
        this.registerLogin(username,password);
        if (response.accountStatus === 'ACTIVE') {
          this.router.navigate(['feed']);
        } else {
          console.log(response);
          this.router.navigate( ['/resendVerificationLink/' + response.oldToken])
        }
    });
  }

  registerLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION, username);
    sessionStorage.setItem('userId',this.id.toString());
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION);
    sessionStorage.removeItem('userId');
    this.username = null;
    this.password = null;
    this.id = null;
  }

  isUserLoggedIn() {
    let loggedInUser = sessionStorage.getItem(this.USER_NAME_SESSION);
    if (loggedInUser === null) return false
    return true
  }

  showLoggedInUser(){
    let user = sessionStorage.getItem(this.USER_NAME_SESSION);
    if(user === null) return '';
    return user;
  }


}
