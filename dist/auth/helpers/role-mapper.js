"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrismaRoleToAppRole = mapPrismaRoleToAppRole;
const role_enum_1 = require("../enums/role.enum");
function mapPrismaRoleToAppRole(role) {
    return role_enum_1.Role[role];
}
//# sourceMappingURL=role-mapper.js.map