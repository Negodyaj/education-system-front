import { Themes } from "../themes/Themes";

export interface Course {
  isDeleted: boolean;
  id: number;
  name: string;
  description: string;
  duration: number;
  themes: Themes[];
  materials: [];
}
