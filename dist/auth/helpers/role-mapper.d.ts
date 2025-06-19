import { Role as PrismaRole } from "@prisma/client";
import { Role } from "../enums/role.enum";
export declare function mapPrismaRoleToAppRole(role: PrismaRole): Role;
