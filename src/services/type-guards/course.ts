import { Course } from "../../interfaces/Courses";

export const isCourse = (data: any): data is Course => {
  return !!data.name && !!data.description;
}