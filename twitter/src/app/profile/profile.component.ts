import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entity/user';
import { AuthenticationService } from '../security-login/authentication.service';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, public authService: AuthenticationService) { }

   id: number;
   user: User;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.findUserById(this.id).subscribe(response => {
      this.user = response;
    });
   }

}
