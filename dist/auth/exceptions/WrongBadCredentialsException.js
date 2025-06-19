"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadCredentialsException = void 0;
const common_1 = require("@nestjs/common");
class BadCredentialsException extends common_1.BadRequestException {
    constructor(message) {
        super({
            message,
        });
    }
}
exports.BadCredentialsException = BadCredentialsException;
//# sourceMappingURL=WrongBadCredentialsException.js.map