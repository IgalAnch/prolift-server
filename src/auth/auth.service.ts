import { Injectable } from '@nestjs/common'; //nest
import { UsersService } from '../users/users.service'; //custom --
import { JwtService } from '@nestjs/jwt'; //nest

import * as bcrypt from 'bcrypt';
import { resolveConfig } from 'prettier';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user);
    let comparison;
    console.log(pass);
    return new Promise(function(resolve, reject) {
      bcrypt.compare(pass, user.password, (err, result) => {
        // result == true
        comparison = result;
        console.log('bcrypt.compare=>() ');
        console.log(comparison);
        console.log('uhh ok');
        console.log('auth.service comparison= ' + result);
        console.log(!!user);
        let b = user && comparison;
        console.log(b);
        resolve(result);
      });
    }).then(res => {
      console.log('comparison= ');
      console.log(comparison);
      console.log('?');
      if (user && comparison) {
        console.log('do i get here');
        const { password, ...result } = user;
        return result;
      } else {
        console.log('why am i here');
        return null;
      }
    });
  }

  async validateUserById(id: number, pass: string): Promise<any> {
    const user = await this.usersService.findById(id);
    let comparison;
    await bcrypt.compare(pass, user.password, function(err, result) {
      // result == true
      comparison = result;
      console.log();
      console.log('auth.service comparison= ' + result);
    });
    if (user && comparison) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
