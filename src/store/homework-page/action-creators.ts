import { AppointInput } from '../../interfaces/AppointInput';
import { Homework } from '../../interfaces/Homework';
import { HomeworkPost } from '../../interfaces/HomeworkPost';
import {
  APPOINT_HOMEWORK,
  GET_HOMEWORKS,
  HOMEWORK_DELETE_PENDING,
  HOMEWORK_LOAD_SUCCESS,
  ITEMS_SET_OPEN,
} from '../actionTypes';

export type HomeworkPageActions =
  | ReturnType<typeof deleteHomeworkRequest>
  | ReturnType<typeof loadHomeworkSuccess>
  | ReturnType<typeof openItemsSet>
  | ReturnType<typeof getHomeworks>
  | ReturnType<typeof appointHomework>;

export const loadHomeworkSuccess = (
  homeworkList: Homework[],
  currentUserRoleId: number
) =>
  ({
    type: HOMEWORK_LOAD_SUCCESS,
    payload: {
      homeworks: homeworkList,
      currentUserRoleId,
    },
  } as const);
export const getHomeworks = (currentUserRoleId: number) =>
  ({
    type: GET_HOMEWORKS,
    payload: currentUserRoleId,
  } as const);
export const deleteHomeworkRequest = (homeworkId: number) =>
  ({
    type: HOMEWORK_DELETE_PENDING,
    payload: homeworkId,
  } as const);
export const openItemsSet = (itemsSetName: string) =>
  ({
    type: ITEMS_SET_OPEN,
    payload: itemsSetName,
  } as const);
export const appointHomework = (
  appointData: AppointInput,
  homework: Homework
) => {
  const appointedHomework: HomeworkPost = {
    description: homework.description,
    startDate: homework.startDate,
    deadlineDate: appointData.deadline,
    courseId: homework.course.id,
    groupId: Number.parseInt(appointData.group[0], 10),
    tagIds: homework.tags.map((tag) => tag.id),
    themeIds: homework.themes?.map((theme) => theme.id) || [],
    isOptional: homework.isOptional,
  };
  console.log(appointedHomework);

  return {
    type: APPOINT_HOMEWORK,
    payload: appointedHomework,
  } as const;
};
