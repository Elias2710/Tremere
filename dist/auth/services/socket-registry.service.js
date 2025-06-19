"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketRegistryService = void 0;
const common_1 = require("@nestjs/common");
let SocketRegistryService = class SocketRegistryService {
    userSockets = new Map();
    addSocket(userId, socketId) {
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, new Set());
        }
        this.userSockets.get(userId).add(socketId);
    }
    removeSocket(socketId) {
        for (const [userId, socketSet] of this.userSockets.entries()) {
            if (socketSet.delete(socketId)) {
                if (socketSet.size === 0) {
                    this.userSockets.delete(userId);
                }
                return userId;
            }
        }
        return undefined;
    }
    getSockets(userId) {
        return Array.from(this.userSockets.get(userId) ?? []);
    }
    isUserOnline(userId) {
        return this.userSockets.has(userId);
    }
    getOnlineUserIds() {
        return Array.from(this.userSockets.keys());
    }
};
exports.SocketRegistryService = SocketRegistryService;
exports.SocketRegistryService = SocketRegistryService = __decorate([
    (0, common_1.Injectable)()
], SocketRegistryService);
//# sourceMappingURL=socket-registry.service.js.map