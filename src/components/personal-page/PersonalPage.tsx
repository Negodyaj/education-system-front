import {useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./PersonalPage.css"
import { IRootState } from "../../store";
import { getUserToEditById } from "../../store/user-page/thunk";
import { useParams } from "react-router-dom";
import { sendGetRequest } from "../../services/http.service";
import { UserInput } from "../../interfaces/UserInput";
import { currentUserUrl, usersUrl } from "../../shared/consts";
import { User } from "../../interfaces/User";
import { isUser } from "../../services/type-guards/user";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  developer?: string;
};

//const for action type
export const USERS_LIST_WRETCH_LOADED = 'USERS_LIST_WRETCH_LOADED';

export type TagsPageActions =
    | ReturnType<typeof setUsersListWasLoaded>

//action creator
export const getUser = (userId?: string) => {
  return (dispatch: Dispatch) => {
      sendGetRequest<User>(`${usersUrl}/${userId}`, isUser)
          .then(user => dispatch(setUsersListWasLoaded(user)))
  }
}

//action
export const setUsersListWasLoaded = (user: User[]) => {
  return ({
      type: USERS_LIST_WRETCH_LOADED,
      payload: user
  } as const);
}



const PersonalPage = () => {
  const [changeForm, setChangeForm] = useState(true);
  const [registr, setRegistr] = useState(true);
  const pageState = useSelector((state: IRootState) => state.userPage);
  const dispatch = useDispatch();
  const { idToEdit } = useParams<{ idToEdit?: string; }>();

useEffect(() => {
  //dispatch(getUserToEditById('1'))
  dispatch(getUser('1'));
}, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const changeEvent = () => {
    (changeForm) ? setChangeForm(false) : setChangeForm(true);
  }
  return (
    <div>
      <button className={changeForm ? "show common-button" : "notshow common-button"} onClick={changeEvent}>change</button>
      <form className={changeForm ? 'notDisabledForm' : 'disabledForm'} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name:</label>
        <input defaultValue={pageState.userForUserPage.firstName}/>
          
        <label htmlFor="lastName">Last Name:</label>
        <input defaultValue={pageState.userForUserPage.lastName}/>
        {//errors.lastName? setChangeForm(false):setChangeForm(true) 
          //errors.firstName? setChangeForm(false):setChangeForm(true)
        }

        <label htmlFor="age">Age</label>
        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          id="age"
        />

        <label htmlFor="gender"></label>
        <select {...register("gender")} id="gender">
          <option value="">Select...</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>

        <label htmlFor="phone">Your phone:</label>
        <input />

        <label htmlFor="email">Your email:</label>
        <input defaultValue={pageState.userForUserPage.email} disabled />

        <button className={changeForm ? "notshow common-button" : "show common-button"} onClick={changeEvent}>сохранить</button>
      </form>
    </div>
  );
}

export default PersonalPage;