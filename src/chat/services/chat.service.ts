import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { plainToInstance } from 'class-transformer';
import { MessageDto } from '../dtos/message.dto';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { PaginatedMessageDto } from '../dtos/paginated-message.dto';
import { PaginatedInboxUserDto } from '../dtos/paginated-inbox-user.dto';
import { InboxUserDto } from '../dtos/inbox-user.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getInboxUsers(
    userId: number,
    { page = 1, limit = 10 }: PaginationQueryDto,
  ): Promise<PaginatedInboxUserDto> {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: {
        timestamp: 'desc',
      },
      select: {
        senderId: true,
        receiverId: true,
        content: true,
        timestamp: true,
      },
    });

    const latestMessageMap = new Map<
      number,
      { content: string; timestamp: Date }
    >();

    for (const msg of messages) {
      const otherUserId =
        msg.senderId === userId ? msg.receiverId : msg.senderId;

      const existing = latestMessageMap.get(otherUserId);

      if (
        !existing ||
        new Date(msg.timestamp).getTime() >
          new Date(existing.timestamp).getTime()
      ) {
        latestMessageMap.set(otherUserId, {
          content: msg.content,
          timestamp: msg.timestamp,
        });
      }
    }

    const allUserIds = Array.from(latestMessageMap.keys());
    const total = allUserIds.length;
    const offset = (page - 1) * limit;
    const pagedUserIds = allUserIds.slice(offset, offset + limit);

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: pagedUserIds },
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    const data: InboxUserDto[] = users.map((user) => ({
      ...user,
      lastMessage: latestMessageMap.get(user.id)?.content || '',
    }));

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async getPreviousMessage(
    userId: number,
    otherUserId: number,
    { page = 1, limit = 10 }: PaginationQueryDto,
  ): Promise<PaginatedMessageDto> {
    const [total, data] = await this.prisma.$transaction([
      this.prisma.message.count({
        where: {
          OR: [
            { senderId: userId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: userId },
          ],
        },
      }),
      this.prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: userId },
          ],
        },
        include: {
          receiver: {
            select: {
              email: true,
              username: true,
              id: true,
              role: true,
            },
          },
          sender: {
            select: {
              email: true,
              username: true,
              id: true,
              role: true,
            },
          },
        },
        orderBy: { timestamp: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      data: plainToInstance(MessageDto, data),
    };
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    const sender = await this.prisma.user.findUnique({
      where: {
        id: createMessageDto.senderId,
      },
    });

    if (!sender) throw new UserNotFoundException(createMessageDto.senderId);

    const receiver = await this.prisma.user.findUnique({
      where: {
        id: createMessageDto.receiverId,
      },
    });

    if (!receiver) throw new UserNotFoundException(createMessageDto.receiverId);

    const message = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        timestamp: new Date(),
        sender: {
          connect: {
            id: createMessageDto.senderId,
          },
        },
        receiver: {
          connect: {
            id: createMessageDto.receiverId,
          },
        },
      },
    });

    return plainToInstance(MessageDto, message);
  }
}
