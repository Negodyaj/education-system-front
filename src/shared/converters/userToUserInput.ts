import { User } from '../../interfaces/User';
import { UserInput } from '../../interfaces/UserInput';
const initUserInput: UserInput = {
  firstName: '',
  lastName: '',
  birthDate: '',
  userPic: '',
  phone: '',
  email: '',
  login: '',
  password: '',
  roles: [],
};
export const convertUserToUserInput = (UpdatedUser: User) => {
  Object.keys(initUserInput).map((k) => {
    (initUserInput as any)[k] = UpdatedUser[k as keyof UserInput];

    return k;
  });

  return initUserInput;
};
