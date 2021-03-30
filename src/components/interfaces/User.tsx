import { SelectItem } from "./SelectItem";

// export interface User {
//     id?: number;
//     name?: string;
//     secondName?: string;
//     birthDate: Date | null;
//     login?: string;
//     role?: SelectItem[];
//     password?: string;
//     phone?: string;
//     email?: string;
//     groupId?: number;
//     groupName?: string;
// }

// export interface User {
//     id?: number,
//     firstName?: string;
//     lastName?: string;
//     birthDate?: string;
//     login?: string;
//     phone?: string;
//     userPic?: string;
//     email?: string;
//     password?: string;
//     groupId?: number;
//     groupName?: string;
//     role?: SelectItem[];
// }
export interface User {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    login: string,
    phone: string,
    userPic: string,
    email: string
}