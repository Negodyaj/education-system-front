import { Tag } from '../../interfaces/Tag';

export const isTagArr = (data: any): data is Tag[] => {
  const dataToCheck = data as Tag[];

  return Array.isArray(dataToCheck) && Array.isArray(dataToCheck)
    ? (() => {
        if (dataToCheck.length) {
          return !!dataToCheck[0].name && !!dataToCheck[0].id;
        }

        return true;
      })()
    : false;
};
