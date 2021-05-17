import { Dispatch } from 'redux';

import { Homework } from '../../interfaces/Homework';
import { sendGetRequest } from '../../services/http.service';
import { isHomeworkArr } from '../../services/type-guards/homeworkArr';
import { homeworkUrl } from '../../shared/consts';
import { thunkResponseHandler } from '../thunkResponseHadlers';

import { loadHomeworkSuccess } from './action-creators';

export const loadHomeworkList = (currentUserRoleId: number) => (
  dispatch: Dispatch<any>
) => {
  sendGetRequest<Homework[]>(`${homeworkUrl}`, isHomeworkArr).then(
    (response) => {
      const homeworks = thunkResponseHandler(dispatch, response);
      homeworks &&
        (() => {
          dispatch(loadHomeworkSuccess(homeworks, currentUserRoleId));
        })();
    }
  );
};
