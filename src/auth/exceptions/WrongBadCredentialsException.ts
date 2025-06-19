import { BadRequestException } from '@nestjs/common';

export class BadCredentialsException extends BadRequestException {
  constructor(message: string) {
    super({
      message,
    });
  }
}
