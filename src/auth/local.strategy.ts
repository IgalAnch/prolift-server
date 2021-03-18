import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('hello?');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      console.log('nono');
      throw new UnauthorizedException();
    }
    console.log('yes');
    return user;
  }

  //login($user,$pass) variables (user,pass). request
}
