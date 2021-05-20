import { Course } from '../../interfaces/Courses';

export const isCourse = (data: any): data is Course =>
  !!data.name && !!data.description;
