import { User } from "../../interfaces/User";

export const isUserArr = (data: any): data is User[] => {
    if (Array.isArray(data)) {
        return !!data[0].email && !!data[0].phone;
    } else {
        return false;
    }
}