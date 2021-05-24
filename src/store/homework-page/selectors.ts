import { IRootState } from '..';

export const getDefaultHWList = (state: IRootState) =>
  state.homeworkPage.homeworkListDefault;
