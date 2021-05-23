import { Tag } from './Tag';
import { Themes } from './Themes';

export interface HomeworkPost {
  description?: string;
  startDate: string;
  deadlineDate: string;
  courseId: number;
  isOptional: boolean;
  groupId: number;
  tagIds: number[];
  themeIds: number[];
}
