import { Material } from '../../interfaces/Materials';

export const isMaterial = (data: any): data is Material =>
  !!data.link && !!data.description;
