import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorizedUser } from '../models/authorized.user';
import { AuthorizedToken } from '../models/authorized.token';
import { LoginDto } from '../dtos/login.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { RegisterDto } from '../dtos/register.dto';
import { BadCredentialsException } from '../exceptions/WrongBadCredentialsException';
import { mapPrismaRoleToAppRole } from '../helpers/role-mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: AuthorizedUser) {
    return await this.jwtService.signAsync(user);
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  async login(loginDto: LoginDto): Promise<AuthorizedToken> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
        password: loginDto.password,
      },
    });

    if (user == null) {
      throw new BadCredentialsException('Wrong username/password');
    }

    const token = await this.generateToken({
      email: user.email,
      userId: user.id,
      username: user.username,
      role: mapPrismaRoleToAppRole(user.role),
    });

    return {
      accessToken: token,
      user: {
        email: user.email,
        id: user.id,
        role: mapPrismaRoleToAppRole(user.role),
        username: user.username,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthorizedToken> {
    const userByUsername = await this.prisma.user.findUnique({
      where: {
        username: registerDto.username,
      },
    });

    if (userByUsername) {
      throw new BadCredentialsException('username is exist');
    }

    const userByEmail = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (userByEmail) {
      throw new BadCredentialsException('email is exist');
    }

    const registeredUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password,
        username: registerDto.username,
      },
    });

    const token = await this.generateToken({
      email: registeredUser.email,
      userId: registeredUser.id,
      username: registeredUser.username,
      role: mapPrismaRoleToAppRole(registeredUser.role),
    });

    return {
      accessToken: token,
      user: {
        email: registeredUser.email,
        id: registeredUser.id,
        role: mapPrismaRoleToAppRole(registeredUser.role),
        username: registeredUser.username,
      },
    };
  }
}
