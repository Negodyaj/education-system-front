import { Lesson } from '../../interfaces/Lesson';

export const isLesson = (data: any): data is Lesson =>
  !!data.description && !!data.lessonDate;
