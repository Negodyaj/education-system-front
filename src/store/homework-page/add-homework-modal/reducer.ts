import { DictionaryEntity } from '../../../interfaces/DictionaryEntity';
import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import {
  COURSES_LOAD_FOR_HW_MODAL_SUCCESS,
  GET_TAGS_FOR_HW_MODAL,
  GET_THEMES_FOR_HW_MODAL,
  HOMEWORK_LOAD_FOR_MODAL_SUCCESS,
} from '../../actionTypes';
import { IAddHomeworkModal } from '../../state';

import { AddHomeworkModalActions } from './action-creators';

export const defaultAddHomeworkValues: HomeworkInput = {
  description: '',
  isOptional: false,
  tags: [],
  themes: [],
  courseId: 0,
};

const initialState: IAddHomeworkModal = {
  isDataLoading: false,
  defaultFormValue: defaultAddHomeworkValues,
  isModalHidden: false,
  coursesEntities: [],
  tagsForHomeworkEntities: [],
  themesForHomeworkEntities: [],
};
let localCoursesEntitites: DictionaryEntity[] = [];
let localTagsEntitites: DictionaryEntity[] = [];
let localThemeEntitites: DictionaryEntity[] = [];
export function addHomeworkModalReducer(
  state: IAddHomeworkModal = initialState,
  action: AddHomeworkModalActions
): IAddHomeworkModal {
  switch (action.type) {
    case HOMEWORK_LOAD_FOR_MODAL_SUCCESS:
      return { ...state, isDataLoading: false, isModalHidden: false };
    case COURSES_LOAD_FOR_HW_MODAL_SUCCESS:
      localCoursesEntitites = action.payload.map((course) => ({
        id: course.id,
        name: course.name,
      }));

      return { ...state, coursesEntities: localCoursesEntitites };
    case GET_TAGS_FOR_HW_MODAL:
      localTagsEntitites = action.payload.map((tag) => ({
        id: tag.id,
        name: tag.name,
      }));

      return { ...state, tagsForHomeworkEntities: localTagsEntitites };
    case GET_THEMES_FOR_HW_MODAL:
      localThemeEntitites = action.payload.map((theme) => ({
        id: theme.id,
        name: theme.name,
      }));

      return { ...state, themesForHomeworkEntities: localThemeEntitites };
    default:
      return state;
  }
}
