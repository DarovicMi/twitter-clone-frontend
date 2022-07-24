import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../entity/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      console.log(this.users);
    });
  }

}
