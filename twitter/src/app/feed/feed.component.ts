import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../entity/user';
import { AuthenticationService } from '../security-login/authentication.service';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{

    constructor(private userService: UserService, private route: ActivatedRoute, public authService: AuthenticationService){}

    ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.getUsers();
      });
    }


  users: User[];

  loading: boolean;

  tweetForm = new FormGroup({
    text: new FormControl('')
  });

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      console.log(this.users);
    });
  }

  // saveTweet (din tweet service)
  // dupa fiecare apel la saveTweet ar trebui apelata metoda de showFeed
  // metoda de showFeed ar trebui apelata si in ngOnInit
}
