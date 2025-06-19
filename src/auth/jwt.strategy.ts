import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthorizedUser } from './models/authorized.user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  validate(payload: any): AuthorizedUser {
    let authorizedUser = new AuthorizedUser(
      payload.userId,
      payload.email,
      payload.username,
      payload.role
    );

    return authorizedUser;
  }

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret',
    });
  }
}
