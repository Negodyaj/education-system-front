import { Course } from "../../interfaces/Courses";


export const isCourseArr = (data: any): data is Course[] => {
    if (data)
        return Array.isArray(data) && !!data[0].name && !!data[0].description;
    else
        return false;
}