import { Group } from "./Group";
import { Themes } from "./Themes";

export interface Lesson {
    id: number;
    group: Group;
    description: string;
    lessonDate: string;
    themes: Themes[];
    recordLink: string;
}