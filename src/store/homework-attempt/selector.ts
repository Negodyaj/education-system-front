import { IRootState } from '..';
import { Homework } from '../../interfaces/Homework';

export const currentHomeworkSelector = (state: IRootState) =>
  state.homeworkAttempt.currentHomework;

export const currentAuthorIdSelector = (state: IRootState) =>
  state.homeworkAttempt.currentAuthorId;
