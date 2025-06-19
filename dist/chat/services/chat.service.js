"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/services/prisma.service");
const user_not_found_exception_1 = require("../../user/exceptions/user-not-found.exception");
const class_transformer_1 = require("class-transformer");
const message_dto_1 = require("../dtos/message.dto");
let ChatService = class ChatService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getInboxUsers(userId, { page = 1, limit = 10 }) {
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
        const latestMessageMap = new Map();
        for (const msg of messages) {
            const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
            const existing = latestMessageMap.get(otherUserId);
            if (!existing ||
                new Date(msg.timestamp).getTime() >
                    new Date(existing.timestamp).getTime()) {
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
        const data = users.map((user) => ({
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
    async getPreviousMessage(userId, otherUserId, { page = 1, limit = 10 }) {
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
            data: (0, class_transformer_1.plainToInstance)(message_dto_1.MessageDto, data),
        };
    }
    async createMessage(createMessageDto) {
        const sender = await this.prisma.user.findUnique({
            where: {
                id: createMessageDto.senderId,
            },
        });
        if (!sender)
            throw new user_not_found_exception_1.UserNotFoundException(createMessageDto.senderId);
        const receiver = await this.prisma.user.findUnique({
            where: {
                id: createMessageDto.receiverId,
            },
        });
        if (!receiver)
            throw new user_not_found_exception_1.UserNotFoundException(createMessageDto.receiverId);
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
        return (0, class_transformer_1.plainToInstance)(message_dto_1.MessageDto, message);
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map