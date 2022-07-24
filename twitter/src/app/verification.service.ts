import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VerificationToken } from './entity/verification-token';
import { Observable } from 'rxjs';
import { User } from './entity/user';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient) { }

  url = environment.apiBaseUrl;

 

  getResentToken(token) {
    let params = new HttpParams().set('token', token);
    console.log(params.toString());
   return this.http.get<any>(`${this.url}/resendVerifyToken`, {params});
  }

 
}
