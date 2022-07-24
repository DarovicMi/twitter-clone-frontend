import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../security-login/authentication.service';
import {User, UserLoginDto} from '../entity/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent  {

  minLength = 8;
  maxLength = 16;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)])
  });

  get loginField() {
    return this.loginForm.controls;
  }


  username: string;
  password: string;



  doLogin() {
    if(this.loginForm.valid){
      this.submitForm();
      this.authenticationService.login(this.username,this.password);
    }
  }

    submitForm(){
      this.username = this.loginForm.get('username').value;
      this.password = this.loginForm.get('password').value;
    }
  }
