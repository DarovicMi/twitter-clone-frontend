
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerificationToken } from '../entity/verification-token';
import { VerificationService } from '../verification.service';

@Component({
  selector: 'app-verification-link',
  templateUrl: './verification-link.component.html',
  styleUrls: ['./verification-link.component.css']
})
export class VerificationLinkComponent implements OnInit{

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

}






}
