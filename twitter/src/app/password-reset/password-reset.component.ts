import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordService } from '../services/password.service';
import { Validators } from '@angular/forms';
import { PasswordResetEmail } from './password-reset-model';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private service: PasswordService) { }

  resetPasswordEmail: FormGroup;
 
  ngOnInit(): void {
    this.resetPasswordEmail = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email])
    });
  
  }

  get passwordEmail(){
      return this.resetPasswordEmail.controls;
  }

  password: PasswordResetEmail = new PasswordResetEmail();
  
  submitEmail() {
     if(this.resetPasswordEmail.invalid){
      return;
     } else {
      this.password.email = this.resetPasswordEmail.get('email').value;
      this.service.resetPassword(this.password).subscribe(response => {
        this.password = response;
        console.log(this.password);
        alert('A link to reset your password has been sent to the email you have provided, please check your inbox');
      });
     }
  }

}
