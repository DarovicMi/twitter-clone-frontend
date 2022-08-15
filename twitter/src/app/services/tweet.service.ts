import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tweet } from '../entity/tweet';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl;
  createTweet(tweet: Tweet) : Observable<Tweet> {
    return this.http.post<Tweet>(`${this.url}/tweet`, tweet);
  }

  getTweets() {
    return this.http.get<Tweet[]>(`${this.url}/tweets`);
  }

  findTweet(tweetId: number){
    return this.http.get<Tweet>(`${this.url}/tweet/${tweetId}`);
  }
  updateTweet(tweetId: number, tweet: Tweet){
    return this.http.put<Tweet>(`${this.url}/tweet/${tweetId}`, tweet);
  }
  deleteTweet(tweetId: number) {
    return this.http.delete<Tweet>(`${this.url}/tweet/${tweetId}`);
  }
  shareTweet(tweetId: number, user: User) {
    return this.http.post<Tweet>(`${this.url}/share/tweet/${tweetId}`, user);
  }
}
