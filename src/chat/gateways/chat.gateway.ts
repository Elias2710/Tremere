import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { plainToInstance } from 'class-transformer';
import { MessageDto } from '../dtos/message.dto';
import { SocketRegistryService } from 'src/auth/services/socket-registry.service';
import { AuthService } from 'src/auth/services/auth.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
    private readonly socketRegistry: SocketRegistryService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;

    try {
      const payload = await this.authService.verifyToken(token);
      const userId = payload.userId;

      this.socketRegistry.addSocket(userId, client.id);
    } catch {
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = this.socketRegistry.removeSocket(client.id);
    if (userId !== undefined) {
      this.server.emit('user:offline', { userId });
    }
  }

  @SubscribeMessage('message:send')
  async handleSendMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = this.socketRegistry
      .getOnlineUserIds()
      .find((id) => this.socketRegistry.getSockets(id).includes(client.id));

    if (!senderId) return;

    const message = await this.chatService.createMessage({
      ...dto,
      senderId,
    });

    const messageDto = plainToInstance(MessageDto, message);

    const receiverSockets = this.socketRegistry.getSockets(dto.receiverId);
    for (const socketId of receiverSockets) {
      this.server.to(socketId).emit('message:receive', messageDto);
    }

    client.emit('message:sent', messageDto);
  }
}
