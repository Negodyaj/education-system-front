export interface UserDelete {
    isDeleted: boolean,
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    login: string,
    phone: string,
    userPic: string,
    email: string,
    roles: number[]
}