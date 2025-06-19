import { Role as PrismaRole } from "@prisma/client";
import { Role } from "../enums/role.enum";

export function mapPrismaRoleToAppRole(role: PrismaRole): Role {
  return Role[role];
}
