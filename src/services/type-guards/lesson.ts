import { Lesson } from "../../interfaces/Lesson";

export const isLesson = (data: any): data is Lesson => {
    return !!data.description && !!data.lessonDate;

}