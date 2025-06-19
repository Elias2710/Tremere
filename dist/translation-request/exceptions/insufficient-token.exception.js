"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientTokenException = void 0;
const common_1 = require("@nestjs/common");
class InsufficientTokenException extends common_1.BadRequestException {
    constructor() {
        super({ message: 'Insufficient tokens to create request' });
    }
}
exports.InsufficientTokenException = InsufficientTokenException;
//# sourceMappingURL=insufficient-token.exception.js.map