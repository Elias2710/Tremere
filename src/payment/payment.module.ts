import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';

@Module({
  imports: [PrismaModule],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule { }
