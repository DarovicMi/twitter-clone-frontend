import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../entity/user';
import { Follower } from '../entity/follower';
import { FollowerService } from '../services/follower.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  constructor(private userService: UserService, private followerService: FollowerService) { }

  users: User[];

  follower: Follower;
  isFollowing: boolean;

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      for(let user of this.users){
        const currentUserId = localStorage.getItem('userId');
        this.followerService.getUserFollowee(+currentUserId)
        .subscribe(followee => {
          console.log(followee);
          for(let follow of followee){
            if(follow.follower.username.includes(user.username)){
              this.isFollowing = true;
            } else {
              this.isFollowing = false;
            }
          }
        });
      }
    });
    }
    


  toggleFollow(userId: number) {
    // const currentUserId = localStorage.getItem('userId');
    if(this.isFollowing) this.followerService.unfollowUser(userId);
    else this.followerService.followUser(userId,this.follower).subscribe(response => {this.follower = response});
  }


}
 
