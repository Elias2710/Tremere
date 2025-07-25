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
exports.MessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("../../user/dtos/user.dto");
class MessageDto {
    id;
    content;
    timestamp;
    senderId;
    receiverId;
    sender;
    receiver;
}
exports.MessageDto = MessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MessageDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello!' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: new Date().toISOString() }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], MessageDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'User ID of sender' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MessageDto.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'User ID of receiver' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MessageDto.prototype, "receiverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_dto_1.UserDto }),
    __metadata("design:type", user_dto_1.UserDto)
], MessageDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_dto_1.UserDto }),
    __metadata("design:type", user_dto_1.UserDto)
], MessageDto.prototype, "receiver", void 0);
//# sourceMappingURL=message.dto.js.map