// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport";
// import { UserService } from "src/user/user.service";
// import { User } from "src/user/user.entity";
// import { Injectable, UnauthorizedException } from "@nestjs/common";

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy,'local'){


// constructor(private readonly userService:UserService){
//     super();
// }
// validate(username:string,password:string):User{
//     const user:User=this.userService.getUserByUserName(username);
// if(user===undefined) throw new UnauthorizedException();
// if(user!= undefined && user.password===password){
//     return user;
// }
// else{
//     throw new UnauthorizedException();
// }
// }

// }




// local.strategy.ts

import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'username', // Optional: specify the field name for the username in the request body
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user: User = this.userService.getUserByUserName(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async authenticate(req, options?): Promise<void> {
    try {
      const user = await this.validate(req.body.username, req.body.password);
      this.success(user);
    } catch (error) {
      this.fail(error);
    }
  }
}



