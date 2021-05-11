import { User } from '../../interfaces/User';
import { UserUpdate } from '../../interfaces/UserUpdate';

const initUserUpdate: UserUpdate = {
  firstName: '',
  lastName: '',
  birthDate: '',
  userPic: '',
  phone: '',
  email: '',
  roles: [],
};

export const convertUserToUserUpdate = (UpdatedUser: User) => {
  Object.keys(initUserUpdate).map((k) => {
    (initUserUpdate as any)[k] = UpdatedUser[k as keyof UserUpdate];

    return k;
  });

  return initUserUpdate;
};
