export class User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    imageUrl?: string;
    accountType?: string;
}

export class UserLoginDto {
  username?: string;
  password?: string;
  accountStatus?: string;
}
