import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthorizedToken } from '../models/authorized.token';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: 'authorize user',
  })
  @ApiOkResponse({
    description: 'authorize user',
    type: AuthorizedToken,
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthorizedToken> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'create a new user',
  })
  @ApiOkResponse({
    description: 'register successfully',
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthorizedToken> {
    return await this.authService.register(registerDto);
  }
}
