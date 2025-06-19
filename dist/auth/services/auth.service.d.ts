import { JwtService } from '@nestjs/jwt';
import { AuthorizedUser } from '../models/authorized.user';
import { AuthorizedToken } from '../models/authorized.token';
import { LoginDto } from '../dtos/login.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { RegisterDto } from '../dtos/register.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    generateToken(user: AuthorizedUser): Promise<string>;
    verifyToken(token: string): Promise<any>;
    login(loginDto: LoginDto): Promise<AuthorizedToken>;
    register(registerDto: RegisterDto): Promise<AuthorizedToken>;
}
