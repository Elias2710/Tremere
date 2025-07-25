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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/services/prisma.service");
const user_dto_1 = require("../dtos/user.dto");
const class_transformer_1 = require("class-transformer");
let UserService = class UserService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUserById(userId) {
        return this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });
    }
    async findAllPaginated(query) {
        const { page = 1, limit = 10 } = query;
        const [total, users] = await this.prismaService.$transaction([
            this.prismaService.user.count(),
            this.prismaService.user.findMany({
                select: {
                    username: true,
                    email: true,
                    role: true,
                    id: true,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: 'asc' },
            }),
        ]);
        return {
            total,
            page,
            limit,
            data: (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, users, {
                excludeExtraneousValues: true,
            }),
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map