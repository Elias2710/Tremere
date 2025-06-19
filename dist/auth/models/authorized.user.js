"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedUser = void 0;
class AuthorizedUser {
    userId;
    email;
    username;
    role;
    constructor(userId, email, username, role) {
        this.userId = userId;
        this.email = email;
        this.username = username;
        this.role = role;
    }
}
exports.AuthorizedUser = AuthorizedUser;
//# sourceMappingURL=authorized.user.js.map