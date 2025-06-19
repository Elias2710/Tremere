import { InboxUserDto } from './inbox-user.dto';
export declare class PaginatedInboxUserDto {
    total: number;
    page: number;
    limit: number;
    data: InboxUserDto[];
}
