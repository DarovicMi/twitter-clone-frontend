import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../entity/user';
import { PasswordService } from '../services/password.service';
import { UserService } from '../services/user-service.service';
import { ChangePasswordModel } from './change-password';
import { CustomValidators } from '../validator/custom-validators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm: FormGroup;
  constructor(private userService: UserService, private passwordService: PasswordService, private authService: AuthenticationService, private router: Router) { 
    this.changePassForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(this.minlength), Validators.maxLength(this.maxlength)]),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(this.minlength), Validators.maxLength(this.maxlength)]),
      confirmNewPassword: new FormControl('',[Validators.required]),
    },
    CustomValidators.mustMatch('newPassword','confirmNewPassword'));
  }

  hide: boolean;
  minlength = 8;
  maxlength = 16;
  get field(){
    return this.changePassForm.controls;
  }

  user: User;
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.userService.findUserById(+userId).subscribe(response => {
      this.user = response;
    });
  }

  password: ChangePasswordModel = new ChangePasswordModel();

  changePassword(){
    this.submitFields(this.password);
    this.passwordService.changePassword(this.password).subscribe(response => {
      alert(response);
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }

  submitFields(password: ChangePasswordModel) {
    password.oldPassword = this.changePassForm.get('oldPassword').value;
    password.newPassword = this.changePassForm.get('newPassword').value;
    password.confirmNewPassword = this.changePassForm.get('confirmNewPassword').value;
  }
}
