import { Course } from './Courses';
import { User } from './User';

export interface Group {
  id?: number;
  startDate: string;
  course?: Course;
  groupStatus: string;
  groupStatusId?: number;
  students: User[];
  teachers: User[];
  tutors: User[];
}
