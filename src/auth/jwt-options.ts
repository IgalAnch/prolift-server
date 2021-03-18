import { jwtConstants } from './constant'; //config

export const jwtOptions = {
  //
  secret: jwtConstants.secret, //config JWT tokens here <- constant
  signOptions: { expiresIn: '11s' }, //                      - configs
};
