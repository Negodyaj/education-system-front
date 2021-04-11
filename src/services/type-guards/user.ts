import { User } from "../../components/interfaces/User";

export const isUser = (data: any): data is User => {
    const dataToCheck = data as User;
    return !Array.isArray(dataToCheck) && !!dataToCheck.email && !!dataToCheck.phone;
}