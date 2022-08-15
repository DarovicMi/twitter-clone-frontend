import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../entity/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  createComment(tweetId: number, comment: Comment){
    return this.http.post<Comment>(`${this.url}/tweet/${tweetId}/comment`,comment);
  }
  getTweetComments(tweetId: number){
    return this.http.get<Comment[]>(`${this.url}/tweet/${tweetId}/comments`);
  }
  updateComment(commentId: number, comment: Comment) {
    return this.http.put<Comment>(`${this.url}/comment/${commentId}`, comment);
  }
  deleteComment(commentId: number) {
    return this.http.delete<Comment>(`${this.url}/comment/${commentId}`);
  }
}
