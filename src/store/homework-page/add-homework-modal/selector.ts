import { IRootState } from '../..';

export const homeworkForUpdateSelector = (state: IRootState) =>
  state.addHomeWorkModal.homeworkForUpdate;

export const homeworkAddDefaultValueSelector = (state: IRootState) =>
  state.addHomeWorkModal.defaultFormValue;
