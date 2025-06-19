import { PaymentService } from '../services/payment.service';
import { CreatePaymentDepositDto } from '../dtos/create-payment-deposit.dto';
import { AuthorizedUser } from 'src/auth/models/authorized.user';
import { Request } from 'express';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    mockDeposit(dto: CreatePaymentDepositDto, user: AuthorizedUser): Promise<any>;
    deposit(dto: CreatePaymentDepositDto, user: AuthorizedUser, req: Request): Promise<import("../dtos/create-payment-deposit-response.dto").CreatePaymentDepositResponseDto>;
    handleVNPayIPN(query: Record<string, string>): Promise<{
        message: string;
    }>;
}
