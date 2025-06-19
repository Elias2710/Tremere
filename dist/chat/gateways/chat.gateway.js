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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("../services/chat.service");
const create_message_dto_1 = require("../dtos/create-message.dto");
const class_transformer_1 = require("class-transformer");
const message_dto_1 = require("../dtos/message.dto");
const socket_registry_service_1 = require("../../auth/services/socket-registry.service");
const auth_service_1 = require("../../auth/services/auth.service");
let ChatGateway = class ChatGateway {
    chatService;
    authService;
    socketRegistry;
    constructor(chatService, authService, socketRegistry) {
        this.chatService = chatService;
        this.authService = authService;
        this.socketRegistry = socketRegistry;
    }
    server;
    async handleConnection(client) {
        const token = client.handshake.query.token;
        try {
            const payload = await this.authService.verifyToken(token);
            const userId = payload.userId;
            this.socketRegistry.addSocket(userId, client.id);
        }
        catch {
            client.disconnect(true);
        }
    }
    async handleDisconnect(client) {
        const userId = this.socketRegistry.removeSocket(client.id);
        if (userId !== undefined) {
            this.server.emit('user:offline', { userId });
        }
    }
    async handleSendMessage(dto, client) {
        const senderId = this.socketRegistry
            .getOnlineUserIds()
            .find((id) => this.socketRegistry.getSockets(id).includes(client.id));
        if (!senderId)
            return;
        const message = await this.chatService.createMessage({
            ...dto,
            senderId,
        });
        const messageDto = (0, class_transformer_1.plainToInstance)(message_dto_1.MessageDto, message);
        const receiverSockets = this.socketRegistry.getSockets(dto.receiverId);
        for (const socketId of receiverSockets) {
            this.server.to(socketId).emit('message:receive', messageDto);
        }
        client.emit('message:sent', messageDto);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message:send'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        auth_service_1.AuthService,
        socket_registry_service_1.SocketRegistryService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map