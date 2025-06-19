import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreatePaymentDepositDto } from '../dtos/create-payment-deposit.dto';
import { Request } from 'express';
import { CreatePaymentDepositResponseDto } from '../dtos/create-payment-deposit-response.dto';
export declare class PaymentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    verifyVNPaySignature(query: Record<string, string>): boolean;
    sortObject(obj: any): {};
    CreateDepositRequest(dto: CreatePaymentDepositDto, userId: number, req: Request): Promise<CreatePaymentDepositResponseDto>;
    mockDepositSuccess(dto: CreatePaymentDepositDto, userId: number): Promise<any>;
}
