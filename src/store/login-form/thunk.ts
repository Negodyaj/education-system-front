import { Dispatch } from 'redux';
import wretch from 'wretch';
import { setToken } from '../../services/auth.service';
import { baseUrl } from '../../shared/consts';
import { getCurrentUser } from '../role-selector/thunk';

export const authenticate = (login: string, password: string) => {
    return (dispatch: Dispatch<any>) => {
        wretch(`${baseUrl}/authentication`)
            .post({ login, password })
            .json(data => {
                setToken(data.token);
                dispatch(getCurrentUser())
            })
    }
}