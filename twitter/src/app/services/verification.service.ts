import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient) { }

  url = environment.apiBaseUrl;


  getResentToken(token) {
    let params = new HttpParams().set('token', token);
   return this.http.get<any>(`${this.url}/resendVerifyToken`, {params});
  }


}
