import { Attempt } from './Attempt';
import { Course } from './Courses';
import { Tag } from './Tag';
import { Themes } from './Themes';

export interface Homework {
  id: number;
  description?: string;
  startDate: string;
  deadlineDate: string;
  course: Course;
  isOptional: boolean;
  groupsIds?: number[];
  tags: Tag[];
  homeworkAttempts?: Attempt[];
  themes?: Themes[];
}
