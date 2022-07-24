import { User } from "./user";

export class VerificationToken {
  constructor(public id: number,
     public token: string, 
     public expirationDate: Date, 
     public user: User)
     {

     }
}
