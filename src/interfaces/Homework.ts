import { Material } from './Materials';
import { Tag } from './Tag';
import { Themes } from './Themes';

export interface Homework {
  id: number;
  description: string;
  startDate: string;
  deadlineDate: string;
  isOptional: boolean;
  group: {
    id: number;
    startDate: string;
    course: {
      id: number;
      name: string;
      description: string;
      duration: number;
      themes: Themes[];
      materials: Material[];
    };
    groupStatus: string;
    groupStatusId: number;
  };
  tags: Tag[];
  homeworkAttempts: any[];
  themes: Themes[];
}
