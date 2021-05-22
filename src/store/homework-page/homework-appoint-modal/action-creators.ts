import { AllGroupsInCollege } from '../../../interfaces/AllGroupsInCollege';
import { Group } from '../../../interfaces/Group';
import { GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED } from '../../actionTypes';

export type HomeworkAppointModalActions = ReturnType<
  typeof groupListByTeacherIdLoaded
>;
export const groupListByTeacherIdLoaded = (groupList: AllGroupsInCollege[]) =>
  ({
    type: GROUP_LIST_FOR_HOMEWORK_APPOINTMENT_LOADED,
    payload: groupList,
  } as const);
