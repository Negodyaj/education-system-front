import { ThemeInCourse } from './ThemeInCourse';

export interface CourseUpdate {
  name: string;
  description: string;
  duration: number;
  materialIds: number[];
  themes: ThemeInCourse[];
}
