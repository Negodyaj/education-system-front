import { User } from "../../components/interfaces/User";




type userArr = User[];
export const isUserArr = (data: any) : data is userArr => {
    const dataToCheck = data as userArr;
    return !!dataToCheck[0].email && !!dataToCheck[0].phone;
}