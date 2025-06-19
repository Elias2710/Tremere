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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("../services/chat.service");
const jwt_guard_1 = require("../../auth/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
const message_dto_1 = require("../dtos/message.dto");
const create_message_dto_1 = require("../dtos/create-message.dto");
const pagination_query_dto_1 = require("../../dtos/pagination-query.dto");
const get_user_decorator_1 = require("../../auth/decorators/get-user.decorator");
const authorized_user_1 = require("../../auth/models/authorized.user");
const paginated_message_dto_1 = require("../dtos/paginated-message.dto");
const paginated_inbox_user_dto_1 = require("../dtos/paginated-inbox-user.dto");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(createMessageDto, user) {
        return this.chatService.createMessage({
            ...createMessageDto,
            senderId: user.userId,
        });
    }
    async getInboxUsers(query, user) {
        return this.chatService.getInboxUsers(user.userId, query);
    }
    async getChatHistory(userId, query, user) {
        return await this.chatService.getPreviousMessage(user.userId, userId, query);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('message'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Message sent', type: message_dto_1.MessageDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'sent message to another user',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        authorized_user_1.AuthorizedUser]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get users in inbox with last message' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiOkResponse)({ type: paginated_inbox_user_dto_1.PaginatedInboxUserDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto,
        authorized_user_1.AuthorizedUser]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getInboxUsers", null);
__decorate([
    (0, common_1.Get)(':userId/messages'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat history with another user' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: Number,
        description: "The other user's ID",
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiOkResponse)({ type: paginated_message_dto_1.PaginatedMessageDto }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_query_dto_1.PaginationQueryDto,
        authorized_user_1.AuthorizedUser]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatHistory", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map