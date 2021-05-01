import { Lesson } from "../../interfaces/Lesson";

export const isLessonArr = (data: any): data is Lesson[] => {
    if (data)
        return Array.isArray(data) && !!data[0].description && !!data[0].lessonDate;
    else
        return false;
}