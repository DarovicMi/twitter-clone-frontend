import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

   canActivate(): any {
     if(this.authenticationService.isUserLoggedIn()) return true;
      this.router.navigate(['/login']);
      return false;
   }
}
