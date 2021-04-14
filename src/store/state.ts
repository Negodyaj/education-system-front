import { User } from "../components/interfaces/User";
import { Course } from "../shared/courses/Courses";

export interface IUserListPageState {
    userList: User[],
    isDataLoading: boolean
}

export interface ICourseListPageState {
    courseList: Course[],
    isDataLoading: boolean
}