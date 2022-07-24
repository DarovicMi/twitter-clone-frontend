import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserLoginDto} from "../entity/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION = 'authenticatedUser';
  private url = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  public login(username: string, password: string): any {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+":"+password)});
    this.http.get<UserLoginDto>(`${this.url}/login`, {headers}).subscribe(response => {
        this.registerLogin(username,password);
        if (response.accountStatus === 'ACTIVE') {
          this.router.navigate(['feed']);
        } else {
          console.log(response);
          this.router.navigate( ['/verifyRegistration/' + response.oldToken])
        }
    });
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
