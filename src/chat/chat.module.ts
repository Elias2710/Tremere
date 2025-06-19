import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatGateway } from './gateways/chat.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  imports: [PrismaModule, AuthModule],
})
export class ChatModule {}
