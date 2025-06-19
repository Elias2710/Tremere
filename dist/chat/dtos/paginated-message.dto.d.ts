import { MessageDto } from './message.dto';
import { PaginatedResponseDto } from 'src/dtos/paginated-response.dto';
export declare class PaginatedMessageDto extends PaginatedResponseDto<MessageDto> {
    data: MessageDto[];
}
