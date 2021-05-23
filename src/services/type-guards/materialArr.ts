import { Material } from '../../interfaces/Materials';

export const isMaterialArr = (data: any): data is Material[] => {
  if (data)
    return Array.isArray(data) && !!data[0].link && !!data[0].description;

  return false;
};
