import { PaymentStatus, PaymentPurpose } from "@prisma/client";
export declare class PaymentDto {
    id: number;
    userId: number;
    amount: number;
    provider: string;
    providerRef: string;
    status: PaymentStatus;
    purpose: PaymentPurpose;
    createdAt: Date;
    updatedAt: Date;
}
