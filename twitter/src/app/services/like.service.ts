import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Like, LikeModel } from '../entity/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  url: string = environment.apiBaseUrl; // localhost:8080
  constructor(private http: HttpClient) { }

  likeTweet(tweetId: number, like: Like){
    return this.http.post<Like>(`${this.url}/like/tweet/${tweetId}`,like);
  }
  unlikeTweet(tweetId: number){
    return this.http.delete<Like>(`${this.url}/unlike/tweet/${tweetId}`);
  }
  getTweetLikes(tweetId: number){
    return this.http.get<LikeModel[]>(`${this.url}/tweet/${tweetId}/likes`);
  }
  likeComment(commentId: number, like:Like){
    return this.http.post<Like>(`${this.url}/like/comment/${commentId}`, like);
  }
  unlikeComment(commentId: number){
    return this.http.delete<Like>(`${this.url}/unlike/comment/${commentId}`);
  }
  getCommentLikes(commentId: number){
    return this.http.get<LikeModel[]>(`${this.url}/comment/${commentId}/likes`);
  }
}
