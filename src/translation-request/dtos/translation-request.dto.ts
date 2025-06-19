import { ApiProperty } from "@nestjs/swagger";
import { PaymentDto } from "src/payment/dtos/payment.dto";

export class TranslationRequestDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'My Awesome Manga' })
  title: string;

  @ApiProperty({ example: 'John Doe' })
  authorName: string;

  @ApiProperty({ example: 'This is an urgent request', required: false })
  additionalComment?: string;

  @ApiProperty({ example: 3 })
  userId: number;

  @ApiProperty({ example: '2025-06-03T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-03T12:01:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ type: () => PaymentDto })
  payment: PaymentDto;
}
