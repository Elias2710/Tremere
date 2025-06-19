"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class PaymentDto {
    id;
    userId;
    amount;
    provider;
    providerRef;
    status;
    purpose;
    createdAt;
    updatedAt;
}
exports.PaymentDto = PaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 21 }),
    __metadata("design:type", Number)
], PaymentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Internal' }),
    __metadata("design:type", String)
], PaymentDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'req-1720000000000' }),
    __metadata("design:type", String)
], PaymentDto.prototype, "providerRef", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PaymentStatus, example: client_1.PaymentStatus.COMPLETED }),
    __metadata("design:type", typeof (_a = typeof client_1.PaymentStatus !== "undefined" && client_1.PaymentStatus) === "function" ? _a : Object)
], PaymentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PaymentPurpose, example: client_1.PaymentPurpose.REQUEST }),
    __metadata("design:type", typeof (_b = typeof client_1.PaymentPurpose !== "undefined" && client_1.PaymentPurpose) === "function" ? _b : Object)
], PaymentDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-03T12:00:00.000Z' }),
    __metadata("design:type", Date)
], PaymentDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-03T12:01:00.000Z' }),
    __metadata("design:type", Date)
], PaymentDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=payment.dto.js.map