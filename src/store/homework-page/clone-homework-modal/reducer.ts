import { CourseIdForCloneHW } from '../../../interfaces/CourseIdForCloneHW';
import { DictionaryEntity } from '../../../interfaces/DictionaryEntity';
import { GET_COURSES_FOR_CLONE_HW_MODAL } from '../../actionTypes';
import { ICloneHomeworkModal } from '../../state';
import { defaultAddHomeworkValues } from '../add-homework-modal/reducer';

import { CloneHomeworkModalActions } from './action-creators';

export const defaultCloneHomeworkValues: CourseIdForCloneHW = {
  courseId: 0,
};

const initialState: ICloneHomeworkModal = {
  isDataLoading: false,
  defaultFormValue: defaultCloneHomeworkValues,
  isModalHidden: false,
  coursesEntities: [],
  homeworkForUpdate: defaultAddHomeworkValues,
};
const localCoursesEntitites: DictionaryEntity[] = [];
export function cloneHomeworkModalReducer(
  state: ICloneHomeworkModal = initialState,
  action: CloneHomeworkModalActions
): ICloneHomeworkModal {
  switch (action.type) {
    default:
      return state;
  }
}
