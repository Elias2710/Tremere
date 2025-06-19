import { ChatService } from '../services/chat.service';
import { MessageDto } from '../dtos/message.dto';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { PaginatedResponseDto } from 'src/dtos/paginated-response.dto';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { AuthorizedUser } from 'src/auth/models/authorized.user';
import { PaginatedInboxUserDto } from '../dtos/paginated-inbox-user.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(createMessageDto: CreateMessageDto, user: AuthorizedUser): Promise<MessageDto>;
    getInboxUsers(query: PaginationQueryDto, user: AuthorizedUser): Promise<PaginatedInboxUserDto>;
    getChatHistory(userId: number, query: PaginationQueryDto, user: AuthorizedUser): Promise<PaginatedResponseDto<MessageDto>>;
}
