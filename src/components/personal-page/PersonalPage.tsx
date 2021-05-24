import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import './PersonalPage.css';
import { useParams } from 'react-router-dom';

import { IRootState } from '../../store';
import { sendGetRequest } from '../../services/http.service';
import { UserInput } from '../../interfaces/UserInput';
import { currentUserUrl, usersUrl } from '../../shared/consts';
import { User } from '../../interfaces/User';
import { isUser } from '../../services/type-guards/user';

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  developer?: string;
};

// const for action type
export const USERS_LIST_WRETCH_LOADED = 'USERS_LIST_WRETCH_LOADED';

export type TagsPageActions = ReturnType<typeof setUsersListWasLoaded>;

// action creator
export const getUser = (userId?: string) => (dispatch: Dispatch) => {
  sendGetRequest<User>(`${usersUrl}/${userId}`, isUser).then((user) =>
    dispatch(setUsersListWasLoaded(user))
  );
};

// action
export const setUsersListWasLoaded = (user: User[]) =>
  ({
    type: USERS_LIST_WRETCH_LOADED,
    payload: user,
  } as const);

const PersonalPage = () => {
  const [changeForm, setChangeForm] = useState(true);
  const pageState = useSelector((state: IRootState) => state.userPage);
  const dispatch = useDispatch();
  const { idToEdit } = useParams<{ idToEdit?: string }>();

  useEffect(() => {
    // dispatch(getUserToEditById('1'))
    dispatch(getUser('1'));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const changeEvent = () => {
    changeForm ? setChangeForm(false) : setChangeForm(true);
  };

  return (
    <div>
      <button
        className={changeForm ? 'show common-button' : 'notshow common-button'}
        onClick={changeEvent}>
        {console.log(pageState.userForUserPage.firstName)}
        change
      </button>
      <button
        className={changeForm ? 'notshow common-button' : 'show common-button'}
        onClick={changeEvent}>
        сохранить
      </button>
    </div>
  );
};

export default PersonalPage;
