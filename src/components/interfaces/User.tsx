import { Role } from "./Role";

export interface User {
    id?: number;
    name?: string;
    secondName?: string;
    birthDate: Date | null;
    login?: string;
    role?: Role[];
    password?: string;
    phone?: string;
    email?: string;
    groupId?: number;
    groupName?: string;
}