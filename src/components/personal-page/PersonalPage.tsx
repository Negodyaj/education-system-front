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
import { getUserToEdit, sendUser } from '../../store/user-page/action-creators';
import { getEnToRuTranslation } from '../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../enums/role';

const PersonalPage = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const [changeForm, setChangeForm] = useState(true);
  const user = appState.userPage.userForUserPage;
  const { idToEdit } = useParams<{ idToEdit?: string }>();
  const history = useHistory();
  const sagaMiddleware = createSagaMiddleware();
  useEffect(() => {
    dispatch(getUserToEdit('1'));
  }, []);

  const changeEvent = () => {
    changeForm ? setChangeForm(false) : setChangeForm(true);
  };

  return (
    <div>
      <div className={changeForm ? 'show-user' : 'notshow-user'}>
        <img
          src={appState.userPage.userForUserPage.userPic}
          className="user-avatar"
          alt="your avatar"
        />
        <div className="user-info">
          <div className="user-name">
            <p>{appState.userPage.userForUserPage.lastName}</p>
            <p>{appState.userPage.userForUserPage.firstName}</p>
            <Link to="/personal-page/edition">
              <button className="round-button">
                <FontAwesomeIcon icon="edit" />
              </button>
            </Link>
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
    </div>
  );
};

export default PersonalPage;
