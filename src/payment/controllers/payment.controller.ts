import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDepositDto } from '../dtos/create-payment-deposit.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthorizedUser } from 'src/auth/models/authorized.user';

import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('mock-deposit')
  @ApiOperation({ summary: 'Mocking, USING FOR DEV ONLY)' })
  @UseGuards(JwtGuard)
  async mockDeposit(
    @Body() dto: CreatePaymentDepositDto,
    @GetUser() user: AuthorizedUser,
  ) {
    return await this.paymentService.mockDepositSuccess(dto, user.userId);
  }

  @Post('deposit')
  @ApiOperation({ summary: 'Integrated Deposit' })
  @UseGuards(JwtGuard)
  async deposit(
    @Body() dto: CreatePaymentDepositDto,
    @GetUser() user: AuthorizedUser,
    @Req() req: Request,
  ) {
    return await this.paymentService.CreateDepositRequest(
      dto,
      user.userId,
      req,
    );
  }

  @Post('ipn')
  @ApiOperation({ summary: 'VNPay IPN callback' })
  async handleVNPayIPN(@Query() query: Record<string, string>) {
    const isValid = this.paymentService.verifyVNPaySignature(query);
    if (!isValid) {
      throw new BadRequestException('Invalid signature');
    }

    // Process the payment notification (e.g., update order status)
    return { message: 'IPN received successfully' };
  }
}
