import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import './UserPage.css';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { IRootState } from '../../store';
import { getUserToEditById, sendUser } from '../../store/user-page/thunk';
import { UserInput } from '../../interfaces/UserInput';
import { User } from '../../interfaces/User';
import FormElement from '../../shared/components/form-elements/FormElement';
import { getUserFormElementSettings } from '../../shared/helpers/userFormRegisterSettingByKey';
import { InputNames } from '../../enums/inputNames';

function UserPage() {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const { idToEdit } = useParams<{ idToEdit?: string }>();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserToEditById(idToEdit));
  }, []);
  useEffect(() => {
    Object.keys(appState.userPage.userForUserPage).map((key) => {
      methods.setValue(
        key as keyof UserInput,
        appState.userPage.userForUserPage[key as keyof UserInput]
      );

      return key;
    });
  }, [appState.userPage.userForUserPage]);
  const onSubmit = (data: User) => {
    dispatch(sendUser(data, appState.userPage.userForUserPageId, history));
  };
  const closeUserPage = () => {
    history.push('/user-list');
  };
  const { ...methods } = useForm<UserInput>();

  return appState.userPage.isDataLoading ? (
    <div>Loading</div>
  ) : (
    <FormProvider {...methods}>
      <div className="user-edit-form needs-validation was-validated">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {Object.keys(appState.userPage.userForUserPage).map((key) => (
            <FormElement
              formElementSettings={getFormElementSettings(key as InputNames)}
              key={key}
            />
          ))}
          <div className="form-row form-row-button">
            <button
              className="common-button"
              type="button"
              onClick={closeUserPage}>
              отмена
            </button>
            <button className="common-button" type="submit">
              сохранить
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
export default UserPage;
