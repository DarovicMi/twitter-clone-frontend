
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

  constructor(private service: VerificationService) { }

  token;

ngOnInit() {
  this.service.getResentToken(this.token).subscribe(response => {
    this.token = response;
    console.log(this.token);
  });
}


  



}
