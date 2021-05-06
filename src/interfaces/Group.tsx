import { Course } from "./Courses";

export interface Group {
    id: number
    startDate: string
    endDate: string
    course: Course
    groupStatus: string
    groupStatusId: number
}