import { IRootState } from '..';

export const getDefaultTagSelector = (state: IRootState) =>
  state.tagsPage.defaultFormValue;
