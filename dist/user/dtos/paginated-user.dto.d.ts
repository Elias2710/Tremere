import { UserDto } from './user.dto';
export declare class PaginatedUserDto {
    page: number;
    limit: number;
    total: number;
    data: UserDto[];
}
