import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserDto } from 'src/user/dtos/user.dto';

export class MessageDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Hello!' })
  @Expose()
  content: string;

  @ApiProperty({ example: new Date().toISOString() })
  @Expose()
  timestamp: Date;

  @ApiProperty({ example: 10, description: 'User ID of sender' })
  @Expose()
  senderId: number;

  @ApiProperty({ example: 20, description: 'User ID of receiver' })
  @Expose()
  receiverId: number;

  @ApiProperty({ type: () => UserDto })
  sender: UserDto;

  @ApiProperty({ type: () => UserDto })
  receiver: UserDto;
}
