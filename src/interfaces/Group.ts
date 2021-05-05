import { Course } from "./Courses";
import { User } from "./User";

export interface Group {
    teachers: User[];
    tutors: User[];
    students: User[];
    id: number;
    startDate: string;
    course: Course;
    groupStatus: string;
    groupStatusId: number;
}