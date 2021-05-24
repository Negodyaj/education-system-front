import { Tag } from './Tag';

export interface Themes {
  isDeleted: boolean;
  id: number;
  name: string;
  tags: Tag[];
}
