import { Homework } from "../../interfaces/Homework";

export const isHomework = (data: any): data is Homework => {
    if (data)
        return !Array.isArray(data) && !!data.name && !!data.description && !!data.id;
    else
        return false;
}