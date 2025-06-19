import { ApiProperty } from '@nestjs/swagger';
import { InboxUserDto } from './inbox-user.dto';

export class PaginatedInboxUserDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ type: [InboxUserDto] })
  data: InboxUserDto[];
}
