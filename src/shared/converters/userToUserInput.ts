import { User } from "../../components/interfaces/User";
import { UserInput } from "../../components/interfaces/UserInput";

const initUserInput: UserInput = {
    firstName: "",
    lastName: "",
    birthDate: '',
    userPic: "",
    phone: "",
    email: "",
    login: "",
    password: "",
    roles: []
}

export const convertUserToUserInput = (UpdatedUser: User) => {
    Object.keys(initUserInput).map(k => {
        initUserInput[k as keyof UserInput] = (UpdatedUser as any)[k]
    })
    return initUserInput;
}