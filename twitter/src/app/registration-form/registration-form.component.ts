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
export class RegistrationFormComponent implements OnInit{
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router){
    this.user = new User();
  }
  
    hide = false;
    minLength = 8;
    maxLength = 16;

    user: User;
    
    ngOnInit(){
      this.userService.registerUser(this.user).subscribe(data => {
        this.user = data;
      });
    }

    onSubmit() {
      this.userService.registerUser(this.user).subscribe(result => this.user = result);
    }


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
    submitted = false;
    success = '';
    get registrationField() {
      return this.registerForm.controls;
    }

    // onSubmit() {
    //   this.submitted = true;

    //   if(this.registerForm.invalid){
    //     return;
    //   }
    //   this.success = JSON.stringify(this.registerForm.value);
    // }
    

    // SEND DATA TO BACKEND
formData() : any {
  return this.validateForm.value;
}
validateForm: FormGroup;
submitForm(){
  const username = this.formData().username;
  const email = this.formData().email;
  const password = this.formData().password;
  const accountType = this.formData().accountType;
  const imageUrl = this.formData().imageUrl;
}




selectedValue: string = '';
types: AccountType[] = [
  {value: 'PUBLIC'},
  {value: 'PRIVATE'}
];

imageUrl: any;

onFileSelected(event: any): void {
this.imageUrl = event.target.files[0] ?? null;
}
}



