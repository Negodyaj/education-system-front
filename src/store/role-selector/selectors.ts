import { IRootState } from '..';

export const currentUserRoleIdSelector = (state: IRootState) =>
  state.roleSelector.currentUserRoleId;
