import { Component, OnInit } from '@angular/core';
import { VerificationService } from '../services/verification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.css']
})
export class ResendVerificationComponent implements OnInit {

  constructor(
    private service: VerificationService,
    private activeRouter: ActivatedRoute) { }

  token;

ngOnInit() {
  this.activeRouter.params.subscribe(params => {
    this.service.getResentToken(params["id"]).subscribe(response => {
      this.token = response;
      console.log(this.token);
    });
  })

}}
