import { ICoursePageState } from "../state";
import { CoursePageActions } from "./action-creators";
import {
  COURSE_LIST_TOGGLE_MODAL_CREATE_COURSE,
  COURSE_LIST_WRETCH_CREATE_COURSE,
  COURSE_LIST_WRETCH_FAIL,
  COURSE_LIST_WRETCH_LOADED,
  COURSE_LIST_WRETCH_LOADING,
  COURSE_LIST_TOGGLE_MODAL_DELETE_COURSE,
} from "../actionTypes";
import { CourseInput } from "../../interfaces/CourseInput";

export const INIT_COURSE_TO_REGISTER: CourseInput = {
  name: "",
  description: "",
  duration: 1,
};

const baseInitialStateIdCourseForDelete = 0;
const initialState: ICoursePageState = {
  courseList: [],
  isOpenModalCreateCourse: false,
  isModalDelete: false,
  isCourseDeleting: false,
  isDataLoading: false,
  idCourseForDelete: baseInitialStateIdCourseForDelete,
  createCourseInputModel: INIT_COURSE_TO_REGISTER,
};
export function coursePageReducer(
  state: ICoursePageState = initialState,
  action: CoursePageActions
): ICoursePageState {
  switch (action.type) {
    case COURSE_LIST_WRETCH_LOADING:
      return { ...state, isDataLoading: true };
    case COURSE_LIST_WRETCH_LOADED:
      return { ...state, courseList: action.payload, isDataLoading: false };
    case COURSE_LIST_WRETCH_FAIL:
      return { ...state, courseList: [], isDataLoading: false };
    case COURSE_LIST_TOGGLE_MODAL_CREATE_COURSE:
      return {
        ...state,
        isOpenModalCreateCourse: !state.isOpenModalCreateCourse,
      };
    case COURSE_LIST_TOGGLE_MODAL_DELETE_COURSE:
      return {
        ...state,
        isModalDelete: !state.isModalDelete,
        idCourseForDelete: action.payload,
      };
    case COURSE_LIST_WRETCH_CREATE_COURSE:
      return { ...state, isDataLoading: false };
    default:
      return state;
  }
}
