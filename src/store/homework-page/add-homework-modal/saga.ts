import { all, call, put } from "redux-saga/effects";
import { Homework } from "../../../interfaces/Homework";
import { sendGetRequest } from "../../../services/http.service";
import { isHomeworkArr } from "../../../services/type-guards/homeworkArr";
import { homeworkUrl } from "../../../shared/consts";
import { tryGetErrorFromResponse } from "../../../shared/helpers/http-response.helper";
import { constructNotificationError } from "../../core/error-notification-constructor";
import { setTagsListWasLoaded } from "../../tags-page/action-creators";

export function* addHWModalRootSaga (){
    yield all([
        getHWForModalSagaWatcher(),
      ]);
    }
export function* getHWForModalSagaWatcher(){

}

export function* loadHMListForModalSaga() {
    try {
const homeworks:Homework[] = yield call(async () =>
sendGetRequest<Homework[]>(homeworkUrl, isHomeworkArr).then((response) => response)
);
const error = tryGetErrorFromResponse(homeworks);

    if (error) yield put(constructNotificationError(error));
    else yield put(setTagsListWasLoaded(homeworks));
  } catch {
    console.log('error setloadHMListForModalSaga');
  }
}