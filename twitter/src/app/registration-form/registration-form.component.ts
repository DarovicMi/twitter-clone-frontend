import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormGroup, FormBuilder, Validators,ValidatorFn,ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { CustomValidators } from '../validator/custom-validators';
import { User } from '../entity/user';
import { ActivatedRoute, Router } from '@angular/router';

export interface AccountType {
  value: string;
}


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  
  user: User;
  constructor(private userService: UserService, private router: Router){
    this.user = new User();
  }
    hide = false;
    minLength = 8;
    maxLength = 16;
    
    registerForm = new FormGroup(
      {
        username: new FormControl('',[Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]),
        confirmPassword: new FormControl('', [Validators.required]),
        accountType: new FormControl('',[Validators.required]),
        imageUrl: new FormControl('',Validators.required)
      },
      CustomValidators.mustMatch('password','confirmPassword')
    );
    get registrationField() {
      return this.registerForm.controls;
    }

    onSubmit() {
      this.submitForm(this.user);
      this.userService.registerUser(this.user).subscribe(result => {
        result = this.user;
        this.router.navigate(['verifyRegistration']);
      }
        
        );
      
    }


    submitForm(user: User){
  user.username = this.registerForm.get('username').value;
  user.email = this.registerForm.get('email').value;
  user.password = this.registerForm.get('password').value;
  user.accountType = this.registerForm.get('accountType').value;
  user.imageUrl = this.registerForm.get('imageUrl').value;
}

selectedValue: string = '';
types: AccountType[] = [
  {value: 'PUBLIC'},
  {value: 'PRIVATE'}
];

}



