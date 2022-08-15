import { Tweet } from "./tweet";
import { Comment } from "./comment";
import { User } from "./user";

export class Like {
    id: number;
    likedTweet: Tweet;
    likedComment: Comment;
    user: User;

}

export class LikeModel {
    username: string;
}
