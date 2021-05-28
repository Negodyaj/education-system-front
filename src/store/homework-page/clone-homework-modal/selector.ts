import { IRootState } from '../..';

export const homeworkCloneDefaultValueSelector = (state: IRootState) =>
  state.cloneHomeWorkModal.defaultFormValue;
