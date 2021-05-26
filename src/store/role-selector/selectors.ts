import { IRootState } from '..';

export const currentUserSelector = (state: IRootState) =>
  state.roleSelector.currentUser;

export const currentUserRoleIdSelector = (state: IRootState) =>
  state.roleSelector.currentUserRoleId;
