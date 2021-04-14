import { User } from "../../interfaces/User";
import { UserUpdate } from "../../interfaces/UserUpdate";

const initUserUpdate: UserUpdate = {
    firstName: "",
    lastName: "",
    birthDate: '',
    userPic: "",
    phone: "",
    email: "",
}

export const convertUserToUserUpdate = (UpdatedUser: User) => {
    Object.keys(initUserUpdate).map(k => {
        initUserUpdate[k as keyof UserUpdate] = UpdatedUser[k as keyof UserUpdate]
    })
    return initUserUpdate;
}