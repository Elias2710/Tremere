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
exports.TranslationRequestController = void 0;
const common_1 = require("@nestjs/common");
const translation_request_service_1 = require("../services/translation-request.service");
const create_translation_request_dto_1 = require("../dtos/create-translation-request.dto");
const get_user_decorator_1 = require("../../auth/decorators/get-user.decorator");
const authorized_user_1 = require("../../auth/models/authorized.user");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/jwt.guard");
const pagination_query_dto_1 = require("../../dtos/pagination-query.dto");
let TranslationRequestController = class TranslationRequestController {
    translationRequestService;
    constructor(translationRequestService) {
        this.translationRequestService = translationRequestService;
    }
    async create(dto, user) {
        return this.translationRequestService.create(dto, user.userId);
    }
    async findAll(query) {
        return this.translationRequestService.findAll(query);
    }
};
exports.TranslationRequestController = TranslationRequestController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create translation request and deduct token' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_translation_request_dto_1.CreateTranslationRequestDto, authorized_user_1.AuthorizedUser]),
    __metadata("design:returntype", Promise)
], TranslationRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all translation requests (paginated)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], TranslationRequestController.prototype, "findAll", null);
exports.TranslationRequestController = TranslationRequestController = __decorate([
    (0, common_1.Controller)('translation-request'),
    __metadata("design:paramtypes", [translation_request_service_1.TranslationRequestService])
], TranslationRequestController);
//# sourceMappingURL=translation-request.controller.js.map