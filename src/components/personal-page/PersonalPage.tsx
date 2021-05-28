import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PersonalPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../store';
import { getUserToEdit } from '../../store/user-page/action-creators';
import { getEnToRuTranslation } from '../../shared/converters/enumToDictionaryEntity';
import { Role } from '../../enums/role';
import { getFromStorage } from '../../services/local-storage.service';
import { getCurrentUserFromStorage } from '../../services/auth.service';

const PersonalPage = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const currentUserId = getCurrentUserFromStorage().id;
  useEffect(() => {
    dispatch(getUserToEdit(`${currentUserId}`));
  }, []);

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
            <Link to="/edition">
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
            <li>{appState.userPage.userForUserPage.email}</li>
            <li>{appState.userPage.userForUserPage.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
