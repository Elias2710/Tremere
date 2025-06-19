import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus, PaymentPurpose } from "@prisma/client";

export class PaymentDto {
  @ApiProperty({ example: 21 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  amount: number;

  @ApiProperty({ example: 'Internal' })
  provider: string;

  @ApiProperty({ example: 'req-1720000000000' })
  providerRef: string;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.COMPLETED })
  status: PaymentStatus;

  @ApiProperty({ enum: PaymentPurpose, example: PaymentPurpose.REQUEST })
  purpose: PaymentPurpose;

  @ApiProperty({ example: '2025-06-03T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-03T12:01:00.000Z' })
  updatedAt: Date;
}
