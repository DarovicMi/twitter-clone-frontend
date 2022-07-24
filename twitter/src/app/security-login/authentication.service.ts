import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION = 'authenticatedUser';
  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+":"+password)});
    return this.http.get(`${this.url}/login`, {headers,responseType:'text' as 'json'}).pipe(map((response) => {
      this.registerLogin(username,password);
    }))
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