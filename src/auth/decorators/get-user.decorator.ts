import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizedUser } from '../models/authorized.user';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthorizedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
