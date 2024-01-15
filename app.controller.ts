import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { AuthService } from './auth/auth.service';
import { usernameGuard } from './username.guard';
import { constants } from 'buffer';
import { CONSTANTS } from './user/constants';

//1- issue the id card jwt token
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
constructor(private readonly authService: AuthService){
}  
  // @Post('/login')
  // @UseGuards(AuthGuard("local"))
  // login():string{
  //   return'login route';
  // }


  @Post('/login')
  @UseGuards(AuthGuard("local"))
  login(@Request()req):string{

    //authentication complete
    //next step authorized
    //id card jwt token
   return this.authService.generateToken(req.user);
    // return req.user;
  }


  @Get('/android-developer')
  @UseGuards(AuthGuard("jwt"),new usernameGuard(CONSTANTS.ROLES.ANDROID_DEVELOPER))

androidDeveloperData(@Request()req):string{
  return"this is private data for android developer"+JSON.stringify(req.user);
}

@Get('/web-developer')
@UseGuards(AuthGuard("jwt"),new usernameGuard(CONSTANTS.ROLES.WEB_DEVELOPER))

webDeveloperData(@Request()req):string{
return"this is private data for web developer"+JSON.stringify(req.user);
}
  
}
