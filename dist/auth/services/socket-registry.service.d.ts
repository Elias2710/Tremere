export declare class SocketRegistryService {
    private readonly userSockets;
    addSocket(userId: number, socketId: string): void;
    removeSocket(socketId: string): number | undefined;
    getSockets(userId: number): string[];
    isUserOnline(userId: number): boolean;
    getOnlineUserIds(): number[];
}
