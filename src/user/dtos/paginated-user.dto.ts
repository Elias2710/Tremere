import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class PaginatedUserDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}
