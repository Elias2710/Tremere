import { UserDto } from 'src/user/dtos/user.dto';
export declare class MessageDto {
    id: number;
    content: string;
    timestamp: Date;
    senderId: number;
    receiverId: number;
    sender: UserDto;
    receiver: UserDto;
}
