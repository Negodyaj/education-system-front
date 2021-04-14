import { UserDelete } from "../../interfaces/UserDelete";

export const isUserDelete  = (data: any): data is UserDelete => {
    const dataToCheck = data as UserDelete;
    return !Array.isArray(dataToCheck) && !!dataToCheck.isDeleted && !!dataToCheck.id && !!dataToCheck.firstName;
}