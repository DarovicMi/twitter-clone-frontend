

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    imageUrl: string;
    accountType: string;
    accountStatus: string;
}

export class UserLoginDto {
  id: number;
  username: string;
  password: string;
  accountStatus?: string;
  oldToken?: string;
}