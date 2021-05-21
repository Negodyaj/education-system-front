import { Homework } from '../../interfaces/Homework';

export const isHomeworkArr = (data: any): data is Homework[] => {
  if (data) return Array.isArray(data) && !!data[0].course && !!data[0].id;

  return false;
};
