import { ExtractJwt, Strategy } from 'passport-jwt'; //passport
import { PassportStrategy } from '@nestjs/passport'; //nest
import { Injectable } from '@nestjs/common'; //nest
import { jwtConstants } from './constant'; //constant

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
