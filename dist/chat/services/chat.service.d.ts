import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { MessageDto } from '../dtos/message.dto';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { PaginatedMessageDto } from '../dtos/paginated-message.dto';
import { PaginatedInboxUserDto } from '../dtos/paginated-inbox-user.dto';
export declare class ChatService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getInboxUsers(userId: number, { page, limit }: PaginationQueryDto): Promise<PaginatedInboxUserDto>;
    getPreviousMessage(userId: number, otherUserId: number, { page, limit }: PaginationQueryDto): Promise<PaginatedMessageDto>;
    createMessage(createMessageDto: CreateMessageDto): Promise<MessageDto>;
}
