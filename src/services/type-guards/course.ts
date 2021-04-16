import { Course } from "../../interfaces/Courses";

export const isCourse = (data: any): data is Course => {
  const dataToCheck = data as Course;
  return !!dataToCheck.name && !!dataToCheck.description;
}