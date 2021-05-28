import { IRootState } from '../..';

export const homeworkForUpdateSelector = (state: IRootState) =>
  state.addHomeWorkModal.homeworkForUpdate;

export const homeworkAddDefaultValueSelector = (state: IRootState) =>
  state.addHomeWorkModal.defaultFormValue;

export const homeworkEditDefaultValueSelector = (state: IRootState) =>
  state.addHomeWorkModal.homeworkForUpdateDefault;
