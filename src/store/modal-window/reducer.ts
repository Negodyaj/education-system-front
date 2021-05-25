import { ChildIndex } from '../../enums/ChildIndex';
import { TOGGLE_MODAL_WINDOW } from '../actionTypes';
import { INIT_COURSE_TO_REGISTER } from '../courses-page/reducer';
import { APPOINT_FORM_DEFAULTS } from '../homework-page/homework-appoint-modal/reducer';
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
