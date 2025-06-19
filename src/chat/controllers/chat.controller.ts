import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MessageDto } from '../dtos/message.dto';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { PaginatedResponseDto } from 'src/dtos/paginated-response.dto';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthorizedUser } from 'src/auth/models/authorized.user';
import { PaginatedMessageDto } from '../dtos/paginated-message.dto';
import { PaginatedInboxUserDto } from '../dtos/paginated-inbox-user.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ description: 'Message sent', type: MessageDto })
  @ApiOperation({
    summary: 'sent message to another user',
  })
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() user: AuthorizedUser,
  ): Promise<MessageDto> {
    return this.chatService.createMessage({
      ...createMessageDto,
      senderId: user.userId,
    });
  }

  @Get('/user')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get users in inbox with last message' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ type: PaginatedInboxUserDto })
  async getInboxUsers(
    @Query() query: PaginationQueryDto,
    @GetUser() user: AuthorizedUser,
  ): Promise<PaginatedInboxUserDto> {
    return this.chatService.getInboxUsers(user.userId, query);
  }

  @Get(':userId/messages')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get chat history with another user' })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: "The other user's ID",
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ type: PaginatedMessageDto })
  async getChatHistory(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: PaginationQueryDto,
    @GetUser() user: AuthorizedUser,
  ): Promise<PaginatedResponseDto<MessageDto>> {
    return await this.chatService.getPreviousMessage(
      user.userId,
      userId,
      query,
    );
  }
}
