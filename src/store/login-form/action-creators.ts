import { AUTHENTICATION } from '../actionTypes';

export const authenticate = (login: string, password: string) =>
  ({
    type: AUTHENTICATION,
    payload: { login, password },
  } as const);
