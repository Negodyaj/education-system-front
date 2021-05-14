import { User } from '../../interfaces/User';

export const isUserArr = (data: any): data is User[] => {
  if (Array.isArray(data)) {
    if ((data as User[]).length) return !!data[0].email && !!data[0].phone;

    return true;
  }

  return false;
};
