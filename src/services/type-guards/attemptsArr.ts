import { Attempt } from "../../interfaces/Attempt";


export const isAttemptArr = (data: any): data is Attempt[] => {
    if (data)
        return Array.isArray(data) && !!data[0].id && !!data[0].comment && !!data[0].author && !!data[0].homeworkAttemptStatus;
    else
        return false;
}