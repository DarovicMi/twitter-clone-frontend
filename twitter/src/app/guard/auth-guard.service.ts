import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../security-login/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

   canActivate(): any {
     if(this.authenticationService.getLoggedInUser()) return true;
      this.router.navigate(['/login']);
      return false;
   }
}
