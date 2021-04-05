import { SelectItem } from "./SelectItem";

export interface UserInput {
    firstName: string;
    lastName: string;
    birthDate: string;
    login: string;
    phone: string;
    userPic: string;
    email: string;
    password: string;
    roleIds?: number[];
}