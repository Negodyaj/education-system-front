import { User } from '../interfaces/User';

import {
  getFromStorage,
  removeFromStorage,
  store,
} from './local-storage.service';

// token
export const getToken = (): string => getFromStorage('token');
export const setToken = (token: string) => {
  store('token', token);
};
export const unsetToken = () => {
  removeFromStorage('token');
};
// current user
export const setCurrentUserInStorage = (user: User) => {
  store('user', JSON.stringify(user));
};
export const getCurrentUserFromStorage = (): User =>
  getFromStorage('user') ? JSON.parse(getFromStorage('user')) : undefined;
