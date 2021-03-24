import { SelectItem } from "./SelectItem";

export interface User {
    id?: number;
    name?: string;
    secondName?: string;
    birthDate: Date | null;
    login?: string;
    role?: SelectItem[];
    password?: string;
    phone?: string;
    email?: string;
    groupId?: number;
    groupName?: string;
}