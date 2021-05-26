import { User } from '../../interfaces/User';
import { UserInput } from '../../interfaces/UserInput';
const initUserInput: UserInput = {
  firstName: '',
  lastName: '',
  birthDate: new Date().toLocaleDateString(),
  userPic: '',
  phone: '',
  email: '',
  login: '',
  password: '',
  roles: [],
};
export const convertUserToUserInput = (InitUser: User) => {
  Object.keys(initUserInput).map((k) => {
    (initUserInput as any)[k] = InitUser[k as keyof UserInput];

    return k;
  });

  return initUserInput;
};
