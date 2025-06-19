import { ApiProperty } from '@nestjs/swagger';

export class InboxUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  lastMessage: string;
}
