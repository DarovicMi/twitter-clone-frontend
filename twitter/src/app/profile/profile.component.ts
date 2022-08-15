import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entity/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user-service.service';
import { Validators } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';
import {map} from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  changeFormUsername: FormGroup;
  changeFormEmail: FormGroup;
  constructor(private userService: UserService, private route: ActivatedRoute, public authService: AuthenticationService, private router: Router) {
    this.changeFormUsername = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)], [uniqueUsernameUpdateValidator(this.userService)]),
   });

   this.changeFormEmail = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email], [uniqueEmailUpdateValidator(this.userService)]),
   });
   }

   get changeFormFieldUsername(){
    return this.changeFormUsername.controls;
   }
   get changeFormFieldEmail() {
    return this.changeFormEmail.controls;
   }

   id: number;
   user: User;
   users: User[];
   minLength = 8;
   maxLength = 16;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.findUserById(this.id).subscribe(response => {
      this.user = response;
    });
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
   }

   editUsername: boolean = false;
   toggleEditUsername(){
    this.editUsername = !this.editUsername;
   }

   editEmail: boolean = false;
   toggleEditEmail() {
    this.editEmail = !this.editEmail;
   }
 

   updateUserUsername(){
    const userId = localStorage.getItem('userId');
    this.user.username = this.changeFormUsername.get('username').value;
    this.userService.updateUser(+userId, this.user).subscribe(response => {
      alert('Relog with your new username');
      this.user = response;
    });
     this.authService.logout();
     this.router.navigate(['login']);
   }


   updateUserEmail() {
    const userId = localStorage.getItem('userId');
    this.user.email = this.changeFormEmail.get('email').value;
    this.userService.updateUser(+userId, this.user).subscribe(response => {
      alert('You have to relog after changing email');
      this.user = response;
    });
    this.authService.logout();
    this.router.navigate(['login']);
   }


   deleteUser(){
      const userId = localStorage.getItem('userId');
      this.userService.deleteUser(+userId).subscribe(response => {
        this.authService.logout();
        this.router.navigate(['/login']);
      });
   }

   changePasswordRoute(){
    this.router.navigate(['changePassword']);
   }

}

export function uniqueUsernameUpdateValidator(userService: UserService): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors> => {
             console.log(control.value);
           return userService.getUserByUsername(control.value)
               .pipe(
                map((result) =>
                   result ? { usernameAlreadyExists: true } : null
            )
          );
    };
}

export function uniqueEmailUpdateValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    console.log(control.value);
    return userService.getUserByEmail(control.value).pipe(map((result) => result ? {emailAlreadyExists: true} : null));
  }
}

