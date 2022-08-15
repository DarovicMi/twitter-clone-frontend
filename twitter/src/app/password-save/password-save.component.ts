import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordModel } from '../entity/password-model';
import { PasswordService } from '../services/password.service';
import { CustomValidators } from '../validator/custom-validators';

@Component({
  selector: 'app-password-save',
  templateUrl: './password-save.component.html',
  styleUrls: ['./password-save.component.css']
})
export class PasswordSaveComponent implements OnInit {

  constructor(private service: PasswordService, private activeRoute: ActivatedRoute, private router: Router) { }

  savePasswordForm : FormGroup;

  ngOnInit(): void {
    this.savePasswordForm = new FormGroup(
    {
      confirmNewPassword: new FormControl('',[Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(this.minlength), Validators.maxLength(this.maxlength)]),
    },
    CustomValidators.mustMatch('newPassword','confirmNewPassword')
    );

   this.token =  this.activeRoute.snapshot.queryParams['token'];
  }

  get field() {
    return this.savePasswordForm.controls;
  }
  minlength = 8;
  maxlength = 16;

  password: PasswordModel = new PasswordModel();
  hide: boolean;
  token: string;
 
  savePassword() {
    if(this.savePasswordForm.valid)
    this.submitFields(this.password);
      this.service.savePassword(this.token,this.password).subscribe(data => {
        alert(data);
        this.router.navigate(['login']);
    });

    }
  
  

  submitFields(password: PasswordModel) {
    password.newPassword = this.savePasswordForm.get('newPassword').value;
    password.confirmNewPassword = this.savePasswordForm.get('confirmNewPassword').value;
  }
}
