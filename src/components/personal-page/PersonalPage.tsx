import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import './PersonalPage.css';
import { useHistory, useParams } from 'react-router-dom';

import { IRootState } from '../../store';
import { sendGetRequest } from '../../services/http.service';
import { UserInput } from '../../interfaces/UserInput';
import { currentUserUrl, usersUrl } from '../../shared/consts';
import { User } from '../../interfaces/User';
import { isUser } from '../../services/type-guards/user';
import FormElement from '../../shared/components/form-elements/FormElement';
import { getUserToEdit, sendUser } from '../../store/user-page/action-creators';
import { getUserFormElementSettings } from '../../shared/helpers/userFormRegisterSettingByKey';
import { InputNames } from '../../enums/inputNames';
import { getEnToRuTranslation } from '../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../enums/role';

const PersonalPage = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const user = appState.userPage.userForUserPage;
  const { idToEdit } = useParams<{ idToEdit?: string }>();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserToEdit('1'));
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
    <div>
      <div className="show-user">
        <img
          src={appState.userPage.userForUserPage.userPic}
          className="user-avatar"
          alt="your avatar"
        />
        <div className="user-info">
          <div className="user-name">
            <p>{appState.userPage.userForUserPage.lastName}</p>
            <p>{appState.userPage.userForUserPage.firstName}</p>
          </div>
          <div className="roles">
            {appState.userPage.userForUserPage.roles?.map((key) => (
              <p>{getEnToRuTranslation(Role[key])}</p>
            ))}
          </div>
          <div className="birth-date">
            Дата рождения {appState.userPage.userForUserPage.birthDate}
          </div>
          <ul className="contact-info">
            Контактная информация
            <li>{appState.userPage.userForUserPage.login}</li>
            <li>{appState.userPage.userForUserPage.email}</li>
            <li>{appState.userPage.userForUserPage.phone}</li>
          </ul>
        </div>
      </div>
      <div className="edit-user">
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
                <button
                  className="common-button"
                  type="button"
                  onClick={closeUserPage}>
                  отмена
                </button>
                <button
                  className="common-button"
                  type="button"
                  onClick={methods.handleSubmit(onSubmit)}>
                  сохранить
                </button>
              </div>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default PersonalPage;
