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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../services/payment.service");
const create_payment_deposit_dto_1 = require("../dtos/create-payment-deposit.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/jwt.guard");
const get_user_decorator_1 = require("../../auth/decorators/get-user.decorator");
const authorized_user_1 = require("../../auth/models/authorized.user");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async mockDeposit(dto, user) {
        return await this.paymentService.mockDepositSuccess(dto, user.userId);
    }
    async deposit(dto, user, req) {
        return await this.paymentService.CreateDepositRequest(dto, user.userId, req);
    }
    async handleVNPayIPN(query) {
        const isValid = this.paymentService.verifyVNPaySignature(query);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid signature');
        }
        return { message: 'IPN received successfully' };
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('mock-deposit'),
    (0, swagger_1.ApiOperation)({ summary: 'Mocking, USING FOR DEV ONLY)' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_deposit_dto_1.CreatePaymentDepositDto,
        authorized_user_1.AuthorizedUser]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "mockDeposit", null);
__decorate([
    (0, common_1.Post)('deposit'),
    (0, swagger_1.ApiOperation)({ summary: 'Integrated Deposit' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_deposit_dto_1.CreatePaymentDepositDto,
        authorized_user_1.AuthorizedUser, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deposit", null);
__decorate([
    (0, common_1.Post)('ipn'),
    (0, swagger_1.ApiOperation)({ summary: 'VNPay IPN callback' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleVNPayIPN", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map