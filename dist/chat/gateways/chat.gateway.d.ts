import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { SocketRegistryService } from 'src/auth/services/socket-registry.service';
import { AuthService } from 'src/auth/services/auth.service';
export declare class ChatGateway implements OnGatewayConnection {
    private readonly chatService;
    private readonly authService;
    private readonly socketRegistry;
    constructor(chatService: ChatService, authService: AuthService, socketRegistry: SocketRegistryService);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleSendMessage(dto: CreateMessageDto, client: Socket): Promise<void>;
}
