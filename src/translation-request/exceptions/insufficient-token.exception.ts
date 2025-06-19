import { BadRequestException } from "@nestjs/common";

export class InsufficientTokenException extends BadRequestException {
  constructor() {
    super({ message: 'Insufficient tokens to create request' });
  }
}
