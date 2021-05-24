import { ChildIndex } from '../../enums/ChildIndex';
import { TOGGLE_MODAL_WINDOW } from '../actionTypes';

export type ModalWindowActions = ReturnType<typeof toggleModalWindow>;

export const toggleModalWindow = (childIndex: ChildIndex) =>
  ({
    type: TOGGLE_MODAL_WINDOW,
    payload: childIndex,
  } as const);
