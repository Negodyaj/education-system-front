import { Homework } from '../../interfaces/Homework';

export const isHomework = (data: any): data is Homework =>
  !!data.id && !!data.description && !!data.deadlineDate && !!data.group;
