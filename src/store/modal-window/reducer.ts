import { ChildIndex } from '../../enums/ChildIndex';
import { TOGGLE_MODAL_WINDOW } from '../actionTypes';
import {
  INIT_MATERIAL_TO_CREATE,
  INIT_THEME_TO_CREATE,
} from '../course-edition/reducer';
import { INIT_COURSE_TO_REGISTER } from '../courses-page/reducer';
import {
  INIT_LESSON_TO_CREATE,
  INIT_LESSON_TO_UPDATE,
} from '../group-page/lesson/reducer';
import { APPOINT_FORM_DEFAULTS } from '../homework-page/homework-appoint-modal/reducer';
import { INIT_PAYMENT } from '../payment/reducer';
import { ModalWindowState } from '../state';

import { ModalWindowActions } from './action-creators';

const initialState: ModalWindowState = {
  isVisible: false,
  childIndex: ChildIndex.Closed,
  modalWindowSettings: {
    [ChildIndex.NewCourse]: {
      headerName: 'Создать курс',
      defaultValues: INIT_COURSE_TO_REGISTER,
    },
    [ChildIndex.AppointHomework]: {
      headerName: 'Назначить ДЗ на группу:',
      defaultValues: APPOINT_FORM_DEFAULTS,
    },
    [ChildIndex.NewLesson]: {
      headerName: 'Запланировать занятие',
      defaultValues: INIT_LESSON_TO_CREATE,
    },
    [ChildIndex.UpdateLesson]: {
      headerName: 'Внести изменения в занятие',
      defaultValues: INIT_LESSON_TO_UPDATE,
    },
    [ChildIndex.NewTheme]: {
      headerName: 'Добавить тему',
      defaultValues: INIT_THEME_TO_CREATE,
    },
    [ChildIndex.NewMaterial]: {
      headerName: 'Добавить материал',
      defaultValues: INIT_MATERIAL_TO_CREATE,
    },
    [ChildIndex.Payment]: {
      headerName: 'Назначить оплату',
      defaultValues: INIT_PAYMENT,
    },
    [ChildIndex.Closed]: {},
  },
};

export function modalWindowReducer(
  state: ModalWindowState = initialState,
  action: ModalWindowActions
): ModalWindowState {
  switch (action.type) {
    case TOGGLE_MODAL_WINDOW:
      return {
        ...state,
        isVisible: !state.isVisible,
        childIndex: action.payload,
      };
    default:
      return state;
  }
}
