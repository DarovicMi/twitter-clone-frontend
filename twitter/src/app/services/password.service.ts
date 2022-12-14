import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordModel } from '../change-password/change-password';
import { PasswordModel } from '../entity/password-model';
import { PasswordResetEmail } from '../password-reset/password-reset-model';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  url = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { 
  }

  public resetPassword(password: PasswordResetEmail): Observable<any>{
    return this.http.post(`${this.url}/resetPassword`, password);
  }

  
  public savePassword(token: string, password: PasswordModel) : Observable<any> {
    let params = new HttpParams().set('token', token);
    return this.http.post<PasswordModel>(`${this.url}/savePassword`, password, {params});
    }

    public changePassword(password: ChangePasswordModel)
    {
      return this.http.put<ChangePasswordModel>(`${this.url}/changePassword`, password);
    }

  }

