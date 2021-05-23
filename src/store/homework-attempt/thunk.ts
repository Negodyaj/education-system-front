import { Dispatch } from 'redux';

import { AllGroupsInCollege } from '../../interfaces/AllGroupsInCollege';
import { Attempt } from '../../interfaces/Attempt';
import { Homework } from '../../interfaces/Homework';
import { sendGetRequest } from '../../services/http.service';
import { isAllGroupsInCollegeArr } from '../../services/type-guards/allGroupsIncollegeArr';
import { isAttemptArr } from '../../services/type-guards/attemptsArr';
import { isHomework } from '../../services/type-guards/homework';
import { homeworkUrl } from '../../shared/consts';
import { thunkResponseHandler } from '../thunkResponseHadlers';

import {
  attemptListLoadingSuccess,
  setAllGroupsInCollege,
  setCurrentAttempt,
  setCurrentGroup,
  setCurrentHomework,
} from './action-creators';

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

export const getAllActiveGroupsInCollege = () => (dispatch: Dispatch) => {
  sendGetRequest<AllGroupsInCollege[]>(`Group`, isAllGroupsInCollegeArr).then(
    (response) => {
      const groups = thunkResponseHandler(dispatch, response);

      if (groups) dispatch(setAllGroupsInCollege(groups));
    }
  );
};

export const getAttemptListToCheck = (
  hwId: string,
  attemptId: string = '0'
) => (dispatch: Dispatch<any>) => {
  sendGetRequest<Attempt[]>(
    `${homeworkUrl}/${hwId}/attempts`,
    isAttemptArr
  ).then((response) => {
    const attempts: Attempt[] = thunkResponseHandler(dispatch, response);
    attempts &&
      (() => {
        dispatch(attemptListLoadingSuccess(attempts));
        dispatch(loadCurrentHomework(hwId || ''));
        attempts.length &&
          dispatch(
            setCurrentAttempt(
              [...attempts].filter(
                (attempt) => attempt.id.toString() === attemptId
              )[0]
            )
          );
        dispatch(getAllActiveGroupsInCollege());
      })();
  });
};
