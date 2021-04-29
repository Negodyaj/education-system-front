import { Themes } from "./Themes";
import { Material } from "./Materials";

export interface Course {
  isDeleted: boolean;
  id: number;
  name: string;
  description: string;
  duration: number;
  themes: Themes[];
  materials: Material[];
}
