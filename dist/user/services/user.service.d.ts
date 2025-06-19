import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { PaginatedUserDto } from '../dtos/paginated-user.dto';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUserById(userId: number): Promise<any>;
    findAllPaginated(query: PaginationQueryDto): Promise<PaginatedUserDto>;
}
