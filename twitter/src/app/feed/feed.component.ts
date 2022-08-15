import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from '../entity/tweet';
import { User } from '../entity/user';
import { AuthenticationService } from '../services/authentication.service';
import { TweetService } from '../services/tweet.service';
import { UserService } from '../services/user-service.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../entity/comment';
import { LikeService } from '../services/like.service';
import { Like, LikeModel } from '../entity/like';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{

    constructor(private userService: UserService, private route: ActivatedRoute, public authService: AuthenticationService, public router: Router
      , private tweetService: TweetService, private commentService: CommentService,private likeService: LikeService){
      }

    tweetForm = new FormGroup({
      text: new FormControl('')
    });
    
    ngOnInit() {
      this.getUser();
      this.getTweets();
      this.getTweetComments();
      this.getTweetLikes();
      this.getCommentLikes();
      }

    

  
    get field() {
      return this.tweetForm.controls;
    }
    
   tweet: Tweet = new Tweet();

    createTweet(){
      const id = localStorage.getItem('userId');
      this.tweet.message = this.tweetForm.get('text').value;
      this.userService.findUserById(+id).subscribe(response => {
        this.user = response;
        this.tweetService.createTweet(this.tweet).subscribe(response => {
          this.tweet = response;
          this.tweet.user = this.user;
          this.getTweets();
        });
      });
    }

    updateTweet() {
      const tweetId = this.route.snapshot.params['tweetId'];
      this.tweet.message = this.tweetForm.get('text').value;
      this.tweetService.updateTweet(tweetId, this.tweet).subscribe(response => {
        this.tweet = response;
        this.getTweets();
      });
    }
    
    toggleEditTweetButton;
    toggleEditTweet(){
      this.toggleEditTweetButton = !this.toggleEditTweetButton;
    }
    deleteTweet() {
      const tweetId = this.route.snapshot.params['tweetId'];
      this.tweetService.deleteTweet(tweetId).subscribe(response => {
        this.tweet = response;
        this.getTweets();
        this.router.navigate(['feed']);
      });
    }

    shareTweet(user: User){
      const tweetId = this.route.snapshot.params['tweetId'];
      this.tweetService.shareTweet(tweetId, user).subscribe(response => {
        this.tweet.sharedBy = response.sharedBy;
      });
    }

    comment: Comment = new Comment();
    showComment: boolean = false;
  
    toggleComment() {
      this.showComment = !this.showComment; 
    }

    commentForm = new FormGroup({
      text: new FormControl('',)
    });

 
    createComment(){
      if(this.commentForm.valid){
    const tweetId = this.route.snapshot.params['tweetId'];
    this.comment.text = this.commentForm.get('text').value;
      this.commentService.createComment(tweetId, this.comment).subscribe(response => {
        this.comment = response;
        this.getTweetComments();
        this.getCommentLikes();
      });
    }
  }
    comments: Comment[];
    getTweetComments(){
      const tweetId = this.route.snapshot.params['tweetId'];
      this.commentService.getTweetComments(tweetId).subscribe(response => {
        this.comments = response;
      });
    }


    updateComment(commentId: number) {
      if(this.commentForm.valid){
      this.comment.text = this.commentForm.get('text').value;
      this.commentService.updateComment(commentId, this.comment).subscribe(response => {
        this.comment = response;
        this.getTweetComments();
      });
      
    }
  }
  
  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(response => {
      this.comment = response; 
      this.getTweetComments(); 
    });
  }
    edit: boolean = false;
    toggleEdit(){
        this.edit = !this.edit;
    }

    user: User = new User();
    getUser() {
      const id = localStorage.getItem('userId');
        this.userService.findUserById(+id).subscribe(response => {
          this.user = response;
        });
    }

    tweets: Tweet[];
    getTweets() {
      this.tweetService.getTweets().subscribe(response => {
        this.tweets = response;
      });
    }


    isTweetLiked: boolean;
    tweetLike: Like = new Like();

    likeTweet(tweetId: number){
      this.likeService.likeTweet(tweetId, this.tweetLike).subscribe(response => {
        this.tweetLike = response;
        this.isTweetLiked = true;
      });
    }

    unlikeTweet(tweetId: number){
      this.likeService.unlikeTweet(tweetId).subscribe(response => {
        this.isTweetLiked = false;
      });
    }

    tweetLikes: LikeModel[];
    getTweetLikes(){
      const tweetId = this.route.snapshot.params['tweetId'];
      this.likeService.getTweetLikes(tweetId).subscribe(response => {
        this.tweetLikes = response;
        for(let like of this.tweetLikes){
        if(like.username === this.user.username){
        this.isTweetLiked = true;
        }
        else {
        this.isTweetLiked = false;
        }
      }
      });
    } 

 

    commentLike: Like = new Like();
    commentLikes: LikeModel[];
    isCommentLiked: boolean;

    likeComment(commentId:number){
      this.likeService.likeComment(commentId, this.commentLike).subscribe(response => {
        this.commentLike = response;
        this.isCommentLiked = true;
        this.getCommentLikes();
      });
    }
    unlikeComment(commentId: number){
      this.likeService.unlikeComment(commentId).subscribe(response => {
        this.isCommentLiked = false;
        this.getCommentLikes();
      });
    }
    getCommentLikes() {
      const tweetId = this.route.snapshot.params['tweetId'];
      this.commentService.getTweetComments(tweetId).subscribe(response => {
        this.comments = response;
        for(let comment of this.comments){
          this.likeService.getCommentLikes(comment.id).subscribe(response => {
            this.commentLikes = response;
            for(let like of this.commentLikes){
              if(like.username.includes(this.user.username)){
                this.isCommentLiked = true;
                break;
              } else {
                this.isCommentLiked = false;
              }
          }});
        }
      });
    }
}