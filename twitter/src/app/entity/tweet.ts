import { User } from "./user";

export class Tweet {
    id: number;
    createdAt: Date;
    message: string;
    updatedAt: Date;
    user: User;
    comments?: Comment[];
    sharedBy?: User[];
    tweetLikes: number = 0;
}
