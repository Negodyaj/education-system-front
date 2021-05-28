import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import './PersonalPage.css';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../store';
import { UserInput } from '../../interfaces/UserInput';
import FormElement from '../../shared/components/form-elements/FormElement';
import {
  getUserToEdit,
  sendUserToEdit,
} from '../../store/user-page/action-creators';
import { getUserFormElementSettings } from '../../shared/helpers/userFormRegisterSettingByKey';
import { InputNames } from '../../enums/inputNames';
import { getCurrentUserFromStorage } from '../../services/auth.service';

const PersonalPageEdit = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const appState = useSelector((state: IRootState) => state);
  const user = appState.userPage.userForUserPage;
  const history = useHistory();
  const currentUserId = getCurrentUserFromStorage().id;
  useEffect(() => {
    dispatch(getUserToEdit(`${currentUserId}`));
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
    dispatch(
      sendUserToEdit(data, appState.userPage.userForUserPageId, history)
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="user-edit-form needs-validation was-validated">
        <form className="personal-page-form">
          {Object.keys(appState.userPage.userForUserPage).map((key) => (
            <FormElement
              formElementSettings={getUserFormElementSettings(
                key as InputNames
              )}
              key={key}
            />
          ))}
          <div className="form-row form-row-button">
            <Link to="/personal-page">
              <button className="common-button">
                <FontAwesomeIcon icon="edit" />
                отмена
              </button>
            </Link>
            <Link to="/personal-page">
              <button
                className="common-button"
                onClick={methods.handleSubmit(onSubmit)}>
                <FontAwesomeIcon icon="edit" />
                сохранить
              </button>
            </Link>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PersonalPageEdit;
