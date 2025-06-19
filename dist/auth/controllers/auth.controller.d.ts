import { LoginDto } from '../dtos/login.dto';
import { AuthorizedToken } from '../models/authorized.token';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<AuthorizedToken>;
    register(registerDto: RegisterDto): Promise<AuthorizedToken>;
}
