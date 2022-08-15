import { Tweet } from "./tweet";
import { User } from "./user";

export class Comment {
    id: number;
    text: string;
    user: User;
    tweet: Tweet;
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
}
