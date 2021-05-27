import React, { useEffect, useState } from 'react';
import { Dispatch, createStore, applyMiddleware } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import './PersonalPage.css';
import { Link, Route, useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import createSagaMiddleware from 'redux-saga';
import { Helmet } from 'react-helmet';

import { IRootState } from '../../store';
import { UserInput } from '../../interfaces/UserInput';
import FormElement from '../../shared/components/form-elements/FormElement';
import { getUserToEdit, sendUser } from '../../store/user-page/action-creators';
import { getUserFormElementSettings } from '../../shared/helpers/userFormRegisterSettingByKey';
import { InputNames } from '../../enums/inputNames';
import { getEnToRuTranslation } from '../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../enums/role';

import PersonalPage from './PersonalPage';

const PersonalPageEdit = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
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
    dispatch(
      sendUser(data, appState.userPage.userForUserPageId, 'personal-page')
    );
    // history.push('personal-page');
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
