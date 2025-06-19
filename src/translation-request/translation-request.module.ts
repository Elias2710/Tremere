import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TranslationRequestService } from './services/translation-request.service';
import { TranslationRequestController } from './controllers/translation-request.controller';

@Module({
  imports: [PrismaModule],
  providers: [TranslationRequestService],
  controllers: [TranslationRequestController]
})
export class TranslationRequestModule { }
