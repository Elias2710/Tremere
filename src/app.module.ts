import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { TranslationRequestModule } from './translation-request/translation-request.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, PrismaModule, ChatModule, UserModule, TranslationRequestModule, PaymentModule],
  controllers: [],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
