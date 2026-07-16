import { ROLES } from "../../config/roles";

export interface PyloadToken {
    sub: string;
    role: ROLES;
}
