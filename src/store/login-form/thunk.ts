import { Dispatch } from 'redux';
import wretch from 'wretch';
import { User } from '../../interfaces/User';
import { setToken } from '../../services/auth.service';
import { sendGetRequest } from '../../services/http.service';
import { isUser } from '../../services/type-guards/user';
import { baseUrl, currentUserUrl } from '../../shared/consts';
import { setIsLoggedIn } from '../app/action-creators';
import { setCurrentUserIsLoading, setCurrentUserWasLoaded, toggleRoleSelector } from '../role-selector/action-creator';
import { thunkResponseHandler } from '../thunkResponseHadlers';

const _getCurrentUser = (dispatch: Dispatch) => {
    dispatch(setCurrentUserIsLoading());
    sendGetRequest<User>(currentUserUrl, isUser)
        .then(currentUser => {
            dispatch(setCurrentUserWasLoaded(thunkResponseHandler(dispatch, currentUser)));
            dispatch(setIsLoggedIn())
        })
}
export const authenticate = (login: string, password: string) => {
    return (dispatch: Dispatch) => {
        wretch(`${baseUrl}/authentication`)
            .post({ login, password })
            .json(data => {
                setToken(data.token);
                _getCurrentUser(dispatch)
            })
    }
}
export const getCurrentUser = () => {
    return (dispatch: Dispatch) => {
        _getCurrentUser(dispatch)
    }
}