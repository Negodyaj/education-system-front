import { Lesson } from '../../../interfaces/Lesson';
import {
  LESSON_LIST_WRETCH_FAIL,
  LESSON_LIST_WRETCH_LOADED,
  LESSON_LIST_WRETCH_LOADING,
} from '../../actionTypes';

export type LessonListActions =
  | ReturnType<typeof setLessonListIsLoading>
  | ReturnType<typeof setLessonListWasLoaded>
  | ReturnType<typeof setLessonListFail>;

export const setLessonListIsLoading = () =>
  ({
    type: LESSON_LIST_WRETCH_LOADING,
    payload: undefined,
  } as const);
export const setLessonListWasLoaded = (lessons: Lesson[]) =>
  ({
    type: LESSON_LIST_WRETCH_LOADED,
    payload: lessons,
  } as const);

export const setLessonListFail = (error: string) =>
  ({
    type: LESSON_LIST_WRETCH_FAIL,
    payload: error,
  } as const);
