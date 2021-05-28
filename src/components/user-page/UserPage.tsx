import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import './UserPage.css';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { IRootState } from '../../store';
import { UserInput } from '../../interfaces/UserInput';
import FormElement from '../../shared/components/form-elements/FormElement';
import { InputNames } from '../../enums/inputNames';
import { getUserFormElementSettings } from '../../shared/helpers/userFormRegisterSettingByKey';
import { getUserToEdit, sendUser } from '../../store/user-page/action-creators';

export interface UserPageOptions {
  isReadonly: boolean;
}

function UserPage() {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const { idToEdit } = useParams<{ idToEdit?: string }>();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserToEdit(idToEdit));
  }, []);
  const { ...methods } = useForm<UserInput>();
  useEffect(() => {
    Object.keys(appState.userPage.userForUserPage).map((key) => {
      methods.setValue(
        key as keyof UserInput,
        appState.userPage.userForUserPage[key as keyof UserInput]
      );

      return undefined;
    });
  }, [appState.userPage.userForUserPage]);
  const onSubmit = (data: UserInput) => {
    dispatch(sendUser(data, appState.userPage.userForUserPageId, history));
  };
  const closeUserPage = () => {
    history.push('/user-list');
  };

  return (
    <FormProvider {...methods}>
      <div className="user-edit-form needs-validation was-validated">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {Object.keys(appState.userPage.userForUserPage).map((key) => (
            <FormElement
              formElementSettings={getUserFormElementSettings(
                key as InputNames
              )}
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
