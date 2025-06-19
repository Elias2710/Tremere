import { PaginatedUserDto } from '../dtos/paginated-user.dto';
import { UserService } from '../services/user.service';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { AuthorizedUser } from 'src/auth/models/authorized.user';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(query: PaginationQueryDto): Promise<PaginatedUserDto>;
    getMe(user: AuthorizedUser): Promise<any>;
}
