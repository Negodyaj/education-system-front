import { Themes } from "./Themes";

export interface Course {
  isDeleted: boolean;
  id: number;
  name: string;
  description: string;
  duration: number;
  themes: Themes[];
  materials: [];
}
