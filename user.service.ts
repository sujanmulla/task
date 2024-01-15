import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { CONSTANTS } from "./constants";
@Injectable()
export class UserService{
    public users: User[]=[
{
    username :"sujan",
    password:"admin",
    email:"user1@gmail.com",
    age:24,
    role:CONSTANTS.ROLES.ANDROID_DEVELOPER
},
{
    username :"samiksha",
    password:"admin",
    email:"samiksha@gmail.com",
    age:23,
    role:CONSTANTS.ROLES.WEB_DEVELOPER
}

    ];

    getUserByUserName(userName:string):User{
        return this.users.find((user:User)=> user.username===userName);
    }
}






