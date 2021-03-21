import { Role } from "./Role";

export interface User{
    id?:number;
    name?: string;
    secondName?: string;
    birthDate?: string;
    login?: string;
    role?:Role[];
    password?: string;
    phone?: string;
    email?: string;
    groupId?: number;
    groupName?:string;
}