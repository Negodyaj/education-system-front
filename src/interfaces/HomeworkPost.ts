import { Tag } from './Tag';
import { Themes } from './Themes';

export interface HomeworkPost {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  deadlineDate: string;
  courseId: number;
  isOptional: boolean;
  groupsId: number;
  tags: Tag[];
  homeworkAttempts?: any[];
  themes?: Themes[];
}
