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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/services/prisma.service");
const qs = require("qs");
const crypto = require("crypto");
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    verifyVNPaySignature(query) {
        console.log(query);
        const vnp_SecureHash = query['vnp_SecureHash'];
        delete query['vnp_SecureHash'];
        delete query['vnp_SecureHashType'];
        const sortedParams = Object.keys(query)
            .sort()
            .reduce((acc, key) => {
            acc[key] = query[key];
            return acc;
        }, {});
        const signData = Object.entries(sortedParams)
            .map(([key, val]) => `${key}=${val}`)
            .join('&');
        const hash = crypto
            .createHmac('sha256', process.env.VNP_HASHSECRET)
            .update(signData)
            .digest('hex');
        return hash === vnp_SecureHash;
    }
    sortObject(obj) {
        var sorted = {};
        var str = [];
        var key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
        }
        return sorted;
    }
    async CreateDepositRequest(dto, userId, req) {
        const ipAddr = req.headers['x-forwarded-for']?.toString() ||
            req.socket.remoteAddress ||
            req.connection.remoteAddress ||
            '';
        const date = new Date();
        const pad = (n) => (n < 10 ? '0' + n : n);
        const createDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
        const orderId = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    token: {
                        increment: dto.amount,
                    },
                },
            }),
            this.prisma.payment.create({
                data: {
                    userId,
                    amount: dto.amount,
                    provider: 'VNPay',
                    providerRef: orderId,
                    status: 'COMPLETED',
                    purpose: 'DEPOSIT',
                },
            }),
        ]);
        const vnpParams = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: process.env.VNP_TMNCODE,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Nap ${dto.amount} token for user ${userId}`,
            vnp_OrderType: 'other',
            vnp_Amount: dto.amount * 1000 * 100,
            vnp_ReturnUrl: `${process.env.VNP_RETURNURL}/deposit-success`,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };
        const sortedParams = this.sortObject(vnpParams);
        var querystring = require('qs');
        var signData = querystring.stringify(sortedParams, { encode: false });
        var crypto = require('crypto');
        var hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        sortedParams['vnp_SecureHash'] = signed;
        const paymentUrl = `${process.env.VNP_URL}?${qs.stringify(sortedParams, { encode: false })}`;
        return {
            url: paymentUrl,
        };
    }
    async mockDepositSuccess(dto, userId) {
        const mockRef = `mock-success-${Date.now()}`;
        const result = await this.prisma.$transaction([
            this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    token: {
                        increment: dto.amount,
                    },
                },
            }),
            this.prisma.payment.create({
                data: {
                    userId,
                    amount: dto.amount,
                    provider: 'MockGateway',
                    providerRef: mockRef,
                    status: 'COMPLETED',
                    purpose: 'DEPOSIT',
                },
            }),
        ]);
        return result;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map