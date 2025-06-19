import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreatePaymentDepositDto {
  @ApiProperty({
    example: 10,
    description: 'The number of tokens the user wants to deposit (1 token = 1000 VND)',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  amount: number; // amount in tokens
}
