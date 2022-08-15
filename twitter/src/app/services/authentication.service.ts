import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  id: number;
  username: string;
  password: string; 

  public login(username: string, password: string): any {
    const headers = new HttpHeaders({Authorization: this.createBasicAuthToken(username,password)});
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
    }, (error: HttpErrorResponse) => {
      if(error.status === 401){
        alert('Invalid credentials');
      }
    });
  }
  
  token;
  createBasicAuthToken(username: string, password: string){
    this.token = 'Basic ' + window.btoa(username + ":" + password);
    localStorage.setItem('token', this.token);
    return this.token;
  }

 

  registerLogin(username, password) {
    localStorage.setItem(this.USER_NAME_SESSION, username);
    localStorage.setItem('userId',this.id.toString());
  }

  logout() {
    localStorage.removeItem(this.USER_NAME_SESSION);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.username = null;
    this.password = null;
    this.id = null;
  }

  isUserLoggedIn() {
    let loggedInUser = localStorage.getItem(this.USER_NAME_SESSION);
    if (loggedInUser === null) return false
    return true
  }

  showLoggedInUser(){
    let user = localStorage.getItem(this.USER_NAME_SESSION);
    if(user === null) return '';
    return user;
  }


}
