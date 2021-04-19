import { UserRegisterResponse } from "../../interfaces/UserRegisterResponse";

export const isUserRegisterResponse = (data: any): data is UserRegisterResponse => {
    const dataToCheck = data as UserRegisterResponse;
    return !Array.isArray(dataToCheck) && !!dataToCheck.email && !!dataToCheck.phone && !!dataToCheck.id;
}