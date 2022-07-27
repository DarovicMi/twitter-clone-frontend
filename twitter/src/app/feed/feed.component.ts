import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entity/user';
import { ProfileComponent } from '../profile/profile.component';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{

    constructor(private userService: UserService, private route: ActivatedRoute, public authService: AuthenticationService, private router: Router){}

  
    ngOnInit(): void {

    }

    getProfile() {
      const id = sessionStorage.getItem('userId');
      return id;
    }
 

  tweetForm = new FormGroup({
    text: new FormControl('')
  });



  // saveTweet (din tweet service)
  // dupa fiecare apel la saveTweet ar trebui apelata metoda de showFeed
  // metoda de showFeed ar trebui apelata si in ngOnInit


}