import { Course } from "../../interfaces/Courses";


export const isCourseDelete = (data: any): data is Course => {
    const dataToCheck = data as Course;
    return !Array.isArray(dataToCheck) && !!dataToCheck.isDeleted && !!dataToCheck.name;
}