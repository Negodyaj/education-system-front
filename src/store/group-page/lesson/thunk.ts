import { Dispatch } from 'redux';

import { Lesson } from '../../../interfaces/Lesson';
import { sendGetRequest } from '../../../services/http.service';
import { isLessonArr } from '../../../services/type-guards/lessonArr';
import { lessonsUrl } from '../../../shared/consts';
import { thunkResponseHandler } from '../../thunkResponseHadlers';

import { setLessonListFail, setLessonListWasLoaded } from './action-creators';

export const getLessonsByGroup = () => (dispatch: Dispatch) => {
  sendGetRequest<Lesson[]>(`${lessonsUrl}/14`, isLessonArr)
    .then((lessons) => {
      dispatch(setLessonListWasLoaded(thunkResponseHandler(dispatch, lessons)));
    })
    .catch((error) => dispatch(setLessonListFail(error)));
};
