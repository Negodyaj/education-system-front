import { Tag } from '../../interfaces/Tag';

export const isTag = (data: any): data is Tag => {
  const dataToCheck = data as Tag;

  return !Array.isArray(dataToCheck) && !!dataToCheck.name && !!dataToCheck.id;
};
