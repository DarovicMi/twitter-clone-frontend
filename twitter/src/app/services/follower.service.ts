import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  Follower } from '../entity/follower';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(private http: HttpClient) { }

  public url: string = environment.apiBaseUrl;

  followUser(userId: number, follower: Follower){
    return this.http.post<Follower>(`${this.url}/follow/user/${userId}`,follower);
  }
  unfollowUser(userId: number) {
    return this.http.delete<Follower>(`${this.url}/unfollow/user/${userId}`);
  }
  getUserFollowers(userId: number) {
    return this.http.get<Follower[]>(`${this.url}/user/${userId}/followers`);
  }
  getUserFollowee(userId: number) {
    return this.http.get<Follower[]>(`${this.url}/user/${userId}/followee`);
  }
}
