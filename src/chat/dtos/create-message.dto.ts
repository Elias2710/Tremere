import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello, how are you?' })
  @IsString()
  @IsNotEmpty()
  content: string;

  senderId?: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  receiverId: number;
}
