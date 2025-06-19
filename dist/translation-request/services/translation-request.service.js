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
exports.TranslationRequestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/services/prisma.service");
const constraint_1 = require("../../utils/constraint");
const insufficient_token_exception_1 = require("../exceptions/insufficient-token.exception");
const class_transformer_1 = require("class-transformer");
const translation_request_dto_1 = require("../dtos/translation-request.dto");
let TranslationRequestService = class TranslationRequestService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10 } = queryDto;
        const skip = (page - 1) * limit;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.translationRequest.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    payment: true,
                },
            }),
            this.prisma.translationRequest.count(),
        ]);
        return {
            data: (0, class_transformer_1.plainToInstance)(translation_request_dto_1.TranslationRequestDto, data),
            limit,
            page,
            total
        };
    }
    async create(createDto, userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                token: true
            }
        });
        if (!user || user.token < constraint_1.Constraint.REQUEST_FEE) {
            throw new insufficient_token_exception_1.InsufficientTokenException();
        }
        const providerRef = `req-${Date.now()}`;
        return this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: userId
                },
                data: {
                    token: {
                        decrement: constraint_1.Constraint.REQUEST_FEE
                    }
                }
            });
            const payment = await tx.payment.create({
                data: {
                    userId,
                    amount: constraint_1.Constraint.REQUEST_FEE,
                    provider: 'Internal',
                    providerRef,
                    purpose: 'REQUEST',
                    status: 'COMPLETED',
                },
            });
            return tx.translationRequest.create({
                data: {
                    title: createDto.title,
                    authorName: createDto.authorName,
                    additionalComment: createDto.additionalComment,
                    userId,
                    paymentId: payment.id
                }
            });
        });
    }
};
exports.TranslationRequestService = TranslationRequestService;
exports.TranslationRequestService = TranslationRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TranslationRequestService);
//# sourceMappingURL=translation-request.service.js.map