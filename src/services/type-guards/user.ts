import { User } from "../../components/interfaces/User";

export type userTypeGuarder = (data: any) => data is User;

export type typeGuarders = userTypeGuarder | undefined;

export const isUser : userTypeGuarder = (data: any) : data is User => {
    const dataToCheck = data as User;
    return !!dataToCheck.email && !!dataToCheck.phone;
}