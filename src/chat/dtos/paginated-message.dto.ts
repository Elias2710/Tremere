import { ApiProperty } from '@nestjs/swagger';
import { MessageDto } from './message.dto';
import { PaginatedResponseDto } from 'src/dtos/paginated-response.dto';

export class PaginatedMessageDto extends PaginatedResponseDto<MessageDto> {
  @ApiProperty({ type: [MessageDto] })
  data: MessageDto[] = [];
}
