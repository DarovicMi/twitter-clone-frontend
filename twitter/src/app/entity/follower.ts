import { User } from "./user";

export class Follower {
    id: number;
    followee: User;
    follower: User;
}

export class FolloweeModel {
    username: string;
    avatar: string;
}

export class FollowerModel {
    username: string;
    avatar: string;
}

