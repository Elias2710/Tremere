import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dtos/user.dto';

export class AuthorizedToken {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
