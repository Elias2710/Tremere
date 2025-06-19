import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketRegistryService {
  private readonly userSockets = new Map<number, Set<string>>();

  addSocket(userId: number, socketId: string): void {
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId)!.add(socketId);
  }

  removeSocket(socketId: string): number | undefined {
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

  getSockets(userId: number): string[] {
    return Array.from(this.userSockets.get(userId) ?? []);
  }

  isUserOnline(userId: number): boolean {
    return this.userSockets.has(userId);
  }

  getOnlineUserIds(): number[] {
    return Array.from(this.userSockets.keys());
  }
}
