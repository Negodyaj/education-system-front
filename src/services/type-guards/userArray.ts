import { User } from "../../components/interfaces/User";

export const isUserArr = (data: any): data is User[] => {
    const dataToCheck = data as User[];
    return Array.isArray(dataToCheck) && !!dataToCheck[0].email && !!dataToCheck[0].phone;
}