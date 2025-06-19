import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDepositResponseDto {
  @ApiProperty()
  url: string;
}
