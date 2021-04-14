import { Course } from "../../interfaces/Courses";


export const isCourseArr = (data: any): data is Course[] => {
    const dataToCheck = data as Course[];
    return Array.isArray(dataToCheck) && !!dataToCheck[0].name && !!dataToCheck[0].description;
}