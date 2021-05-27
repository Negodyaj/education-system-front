import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Group } from '../../../interfaces/Group';
import { sendGetRequest } from '../../../services/http.service';
import { isGroup } from '../../../services/type-guards/group';
import { tryGetErrorFromResponse } from '../../../shared/helpers/http-response.helper';
import { GET_GROUP } from '../../actionTypes';
import { setIsLoaded, setIsLoading } from '../../app/action-creators';
import { constructNotificationError } from '../../core/error-notification-constructor';

import { getGroup, setGroupToViewWasLoaded } from './action-creaters';

function* groupRootSaga() {
  yield all([getGroupSagaWatcher()]);
}
function* getGroupSagaWatcher() {
  yield takeLatest(GET_GROUP, getGroupSagaWorker);
}
function* getGroupSagaWorker({ payload }: ReturnType<typeof getGroup>) {
  yield put(setIsLoading());

  const group: Group = yield call(async () =>
    sendGetRequest<Group>(`group/${payload}`, isGroup).then(
      (response) => response
    )
  );

  const error = tryGetErrorFromResponse(group);

  if (error) yield put(constructNotificationError(error));
  else yield put(setGroupToViewWasLoaded(group));

  yield put(setIsLoaded());
}

export default groupRootSaga;
