import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedUserDto } from '../dtos/paginated-user.dto';
import { UserService } from '../services/user.service';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthorizedUser } from 'src/auth/models/authorized.user';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: PaginatedUserDto, isArray: true })
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedUserDto> {
    return await this.userService.findAllPaginated(query);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get my profile' })
  async getMe(@GetUser() user: AuthorizedUser) {
    return await this.userService.getUserById(user.userId);
  }
}
