import { Role } from "../enums/role.enum";

export class AuthorizedUser {
  userId: number;
  email: string;
  username: string;
  role: Role;

  constructor(userId: number, email: string, username: string, role: Role) {
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.role = role;
  }
}
