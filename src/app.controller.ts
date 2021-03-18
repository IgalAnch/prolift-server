import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('req')
  ok(@Request() req, @Response() res) {
    //  console.log(req);
    console.log(req.headers);
    console.log(
      '==================================================================',
    );
    res.end();
  }

  //@UseGuards(LocalAuthGuard) == reenable later
  @Post('auth/login')
  async login(@Request() req) {
    return; //this.authService.login(req.user); REENABLE LATER
  }

  //@UseGuards(JwtAuthGuard) == reenable later
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }
}
