import { AllGroupsInCollege } from '../../../interfaces/AllGroupsInCollege';
import { Group } from '../../../interfaces/Group';
import { Homework } from '../../../interfaces/Homework';
import {
  GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED,
  SET_HOMEWORK_FOR_APPOINTMENT,
} from '../../actionTypes';

export type HomeworkAppointModalActions =
  | ReturnType<typeof groupListByTeacherIdLoaded>
  | ReturnType<typeof setHomeworkForAppointment>;
export const groupListByTeacherIdLoaded = (groupList: AllGroupsInCollege[]) =>
  ({
    type: GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED,
    payload: groupList,
  } as const);
export const setHomeworkForAppointment = (hw: Homework) =>
  ({
    type: SET_HOMEWORK_FOR_APPOINTMENT,
    payload: hw,
  } as const);
