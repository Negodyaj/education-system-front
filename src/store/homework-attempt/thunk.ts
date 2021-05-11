import { Dispatch } from 'redux';

import { Attempt } from '../../interfaces/Attempt';
import { Homework } from '../../interfaces/Homework';
import { sendGetRequest } from '../../services/http.service';
import { isAttemptArr } from '../../services/type-guards/attemptsArr';
import { isHomework } from '../../services/type-guards/homework';
import { homeworkUrl } from '../../shared/consts';
import { thunkResponseHandler } from '../thunkResponseHadlers';

import {
  attemptListLoadingSuccess,
  setCurrentGroup,
  setCurrentHomework,
} from './action-creators';

export const getAttemptListToCheck = (hwId: string) => (dispatch: Dispatch) => {
  sendGetRequest<Attempt[]>(
    `${homeworkUrl}/${hwId}/attempts`,
    isAttemptArr
  ).then((response) => {
    const attempts = thunkResponseHandler(dispatch, response);
    attempts && dispatch(attemptListLoadingSuccess(attempts));
  });
};
export const loadCurrentHomework = (hwId: string) => (dispatch: Dispatch) => {
  sendGetRequest<Homework>(`${homeworkUrl}/${hwId}`, isHomework).then(
    (response) => {
      const homework = thunkResponseHandler(dispatch, response);

      if (homework) {
        dispatch(setCurrentHomework(homework));
        dispatch(setCurrentGroup(homework.group));
      }
    }
  );
};
