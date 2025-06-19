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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/services/prisma.service");
const WrongBadCredentialsException_1 = require("../exceptions/WrongBadCredentialsException");
const role_mapper_1 = require("../helpers/role-mapper");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async generateToken(user) {
        return await this.jwtService.signAsync(user);
    }
    async verifyToken(token) {
        return this.jwtService.verifyAsync(token);
    }
    async login(loginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: loginDto.username,
                password: loginDto.password,
            },
        });
        if (user == null) {
            throw new WrongBadCredentialsException_1.BadCredentialsException('Wrong username/password');
        }
        const token = await this.generateToken({
            email: user.email,
            userId: user.id,
            username: user.username,
            role: (0, role_mapper_1.mapPrismaRoleToAppRole)(user.role),
        });
        return {
            accessToken: token,
            user: {
                email: user.email,
                id: user.id,
                role: (0, role_mapper_1.mapPrismaRoleToAppRole)(user.role),
                username: user.username,
            },
        };
    }
    async register(registerDto) {
        const userByUsername = await this.prisma.user.findUnique({
            where: {
                username: registerDto.username,
            },
        });
        if (userByUsername) {
            throw new WrongBadCredentialsException_1.BadCredentialsException('username is exist');
        }
        const userByEmail = await this.prisma.user.findUnique({
            where: {
                email: registerDto.email,
            },
        });
        if (userByEmail) {
            throw new WrongBadCredentialsException_1.BadCredentialsException('email is exist');
        }
        const registeredUser = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: registerDto.password,
                username: registerDto.username,
            },
        });
        const token = await this.generateToken({
            email: registeredUser.email,
            userId: registeredUser.id,
            username: registeredUser.username,
            role: (0, role_mapper_1.mapPrismaRoleToAppRole)(registeredUser.role),
        });
        return {
            accessToken: token,
            user: {
                email: registeredUser.email,
                id: registeredUser.id,
                role: (0, role_mapper_1.mapPrismaRoleToAppRole)(registeredUser.role),
                username: registeredUser.username,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map