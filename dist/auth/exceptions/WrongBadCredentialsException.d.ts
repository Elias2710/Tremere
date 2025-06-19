import { BadRequestException } from '@nestjs/common';
export declare class BadCredentialsException extends BadRequestException {
    constructor(message: string);
}
