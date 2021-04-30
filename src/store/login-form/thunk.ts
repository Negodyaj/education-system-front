import { Dispatch } from 'redux';
import wretch from 'wretch';
import { setToken } from '../../services/auth.service';
import { baseUrl } from '../../shared/consts';
import { getCurrentUser } from '../role-selector/thunk';
import { thunkResponseHandler } from '../thunkResponseHadlers';

export const authenticate = (login: string, password: string) => {
    return (dispatch: Dispatch<any>) => {
        wretch(`${baseUrl}/authentication`)
            .post({ login, password })
            .json(data => {
                const response = thunkResponseHandler(dispatch, data);
                response && setToken(data.token);
                response && dispatch(getCurrentUser());
            })
    }
}