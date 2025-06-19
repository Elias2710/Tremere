import { Role } from "../enums/role.enum";
export declare class AuthorizedUser {
    userId: number;
    email: string;
    username: string;
    role: Role;
    constructor(userId: number, email: string, username: string, role: Role);
}
