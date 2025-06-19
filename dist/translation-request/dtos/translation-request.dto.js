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
exports.TranslationRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_dto_1 = require("../../payment/dtos/payment.dto");
class TranslationRequestDto {
    id;
    title;
    authorName;
    additionalComment;
    userId;
    createdAt;
    updatedAt;
    payment;
}
exports.TranslationRequestDto = TranslationRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TranslationRequestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My Awesome Manga' }),
    __metadata("design:type", String)
], TranslationRequestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], TranslationRequestDto.prototype, "authorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'This is an urgent request', required: false }),
    __metadata("design:type", String)
], TranslationRequestDto.prototype, "additionalComment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], TranslationRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-03T12:00:00.000Z' }),
    __metadata("design:type", Date)
], TranslationRequestDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-03T12:01:00.000Z' }),
    __metadata("design:type", Date)
], TranslationRequestDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => payment_dto_1.PaymentDto }),
    __metadata("design:type", payment_dto_1.PaymentDto)
], TranslationRequestDto.prototype, "payment", void 0);
//# sourceMappingURL=translation-request.dto.js.map