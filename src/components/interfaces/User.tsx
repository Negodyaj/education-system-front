export interface User {
    id?: number;
    firstName?: string;
    lastName: string;
    birthDate?: string;
    login?: string;
    phone?: string;
    userPic?: string;
    email?: string;
    password?: string;
    groupId?: number;
    groupName?: string;
    roleIds?: number[];
}