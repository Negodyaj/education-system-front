import { AppointInput } from '../../../interfaces/AppointInput';
import { DictionaryEntity } from '../../../interfaces/DictionaryEntity';
import { INIT_HOMEWORK } from '../../../shared/tmp-mock-data/hw/initHomewwork';
import {
  GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED,
  SET_HOMEWORK_FOR_APPOINTMENT,
} from '../../actionTypes';
import { IHomeworkAppointModalState } from '../../state';

import { HomeworkAppointModalActions } from './action-creators';

export const APPOINT_FORM_DEFAULTS: AppointInput = {
  group: '',
  deadline: '',
};
const initialState: IHomeworkAppointModalState = {
  groupListByTeacherId: [],
  groupEntities: [],
  appointFormDefaults: APPOINT_FORM_DEFAULTS,
  homeworkForAppointment: INIT_HOMEWORK,
};
const localGroupEntities: DictionaryEntity[] = [];
export function homeworkAppointModalReducer(
  state: IHomeworkAppointModalState = initialState,
  action: HomeworkAppointModalActions
): IHomeworkAppointModalState {
  switch (action.type) {
    case GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED:
      action.payload.map((group) =>
        localGroupEntities.push({
          id: group.id,
          name: `${group.course.name} ${group.startDate}`,
        })
      );

      return {
        ...state,
        groupListByTeacherId: action.payload,
        groupEntities: localGroupEntities,
      };
    case SET_HOMEWORK_FOR_APPOINTMENT:
      return {
        ...state,
        homeworkForAppointment: action.payload,
      };

    default:
      return state;
  }
}
