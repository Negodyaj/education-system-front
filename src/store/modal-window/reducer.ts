import { ChildIndex } from '../../enums/ChildIndex';
import { TOGGLE_MODAL_WINDOW } from '../actionTypes';
import { ModalWindowState } from '../state';

import { ModalWindowActions } from './action-creators';

const initialState: ModalWindowState = {
  isVisible: false,
  childIndex: ChildIndex.Closed,
  modalWindowSettings: {
    [ChildIndex.NewCourse]: {
      headerName: 'Создать курс',
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
