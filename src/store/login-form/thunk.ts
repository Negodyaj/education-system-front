import { Dispatch } from 'redux';
import wretch from 'wretch';

import { setToken } from '../../services/auth.service';
import { baseUrl } from '../../shared/consts';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { pushNotification } from '../notifications/action-creators';
import { getCurrentUser } from '../role-selector/thunk';
import { thunkResponseHandler } from '../thunkResponseHadlers';

export const authenticate = (login: string, password: string) => (
  dispatch: Dispatch<any>
) => {
  wretch(`${baseUrl}/authentication`)
    .post({ login, password })
    .json((data) => {
      setToken(data.token);
      dispatch(getCurrentUser());
    })
    .catch((error) => {
      dispatch(
        pushNotification(makeNotification('error', 'Неверный логин или пароль'))
      );
    });
};
