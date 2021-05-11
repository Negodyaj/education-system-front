import { Group } from '../../interfaces/Group';

export const isGroup = (data: any): data is Group => {
  const dataToCheck = data as Group;

  return !!dataToCheck.course && !!dataToCheck.groupStatus;
};
