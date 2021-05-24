import { GroupStatuses } from '../enums/groupStatuses';

import { Course } from './Courses';

export interface AllGroupsInCollege {
  id: number;
  startDate: string;
  course: Course;
  groupStatus: GroupStatuses;
  endDate: string;
}
