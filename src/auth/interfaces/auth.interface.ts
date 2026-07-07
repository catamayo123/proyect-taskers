import { ROLES } from "src/config/roles";

export interface PyloadToken {
    sub: string;
    role: ROLES;
}

export interface AuthBody {
    username: string;
    password: string;
}