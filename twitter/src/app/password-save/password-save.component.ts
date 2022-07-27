import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordModel } from '../entity/password-model';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-password-save',
  templateUrl: './password-save.component.html',
  styleUrls: ['./password-save.component.css']
})
export class PasswordSaveComponent implements OnInit {

  constructor(private service: PasswordService, private activeRoute: ActivatedRoute, private router: Router) { }

  savePasswordForm : FormGroup;

  ngOnInit(): void {
    this.savePasswordForm = new FormGroup({
      oldPassword: new FormControl('',[Validators.required]),
      newPassword: new FormControl('', [Validators.required])
    });
  }

  get field() {
    return this.savePasswordForm.controls;
  }

  password: PasswordModel = new PasswordModel();

  
 
  savePassword() {
    if(this.savePasswordForm.valid)
    this.submitFields(this.password);
    console.log(this.password);
    this.service.savePassword(this.password).subscribe(response => {
      this.password = response;
      console.log(response.json());
    });
    }
  
  

  submitFields(password: PasswordModel) {
    password.oldPassword = this.savePasswordForm.get('oldPassword').value;
    password.newPassword = this.savePasswordForm.get('newPassword').value;
  }
}
