import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {User, UserLoginDto} from '../entity/user';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent  implements OnInit{
loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]),
    });
  
  }
  minLength = 8;
  maxLength = 16;
  
  constructor(private authenticationService: AuthenticationService, private router: Router) { }


  get loginField() {
    return this.loginForm.controls;
  }


  doLogin() {
    if(this.loginForm.valid){
      this.submitForm();
      this.authenticationService.login(this.username,this.password);
    }

  }

    username: string;
    password: string;
      submitForm(){
        this.username = this.loginForm.get('username').value;
        this.password = this.loginForm.get('password').value;
    }
  }
