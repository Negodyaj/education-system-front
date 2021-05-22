import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  fork,
  select,
} from 'redux-saga/effects';
import { createServer } from 'miragejs';

import { Homework } from '../../interfaces/Homework';
import { sendGetRequest, sendPostRequest } from '../../services/http.service';
import { isHomework } from '../../services/type-guards/homework';
import { isHomeworkArr } from '../../services/type-guards/homeworkArr';
import { homeworkUrl } from '../../shared/consts';
import { tryGetErrorFromResponse } from '../../shared/helpers/http-response.helper';
import { timeout } from '../../shared/helpers/timeOutHelper';
import { APPOINT_HOMEWORK, GET_HOMEWORKS } from '../actionTypes';
import { setIsLoaded, setIsLoading } from '../app/action-creators';
import { constructNotificationError } from '../core/error-notification-constructor';
import { constructSuccessNotification } from '../core/sucess-notification-constructor';

import {
  appointHomework,
  getHomeworks,
  HomeworkPageActions,
  loadHomeworkSuccess,
} from './action-creators';
import { getDefaultHWList } from './selectors';

createServer({
  routes() {
    this.passthrough('https://80.78.240.16:7070/api/authentication');
    this.passthrough('https://80.78.240.16:7070/api/User/current');
    this.get('api/Homework', () => [
      {
        id: 3,
        description: 'Паттерн декоратор',
        startDate: '29.04.2021',
        deadlineDate: '01.05.2021',
        isOptional: false,
        course: {
          id: 4,
          name: 'Frontend',
          description:
            'Специальный курс Frontend для студентов успешно прошедших базовый курс',
          duration: 0,
          isDeleted: false,
          materials: [
            {
              id: 1,
              link: 'https://htmlreference.io/',
              description: 'html',
            },
            {
              id: 3,
              link: 'http://getbootstrap.com ',
              description: 'bootstrap',
            },
            {
              id: 4,
              link:
                'www.typescriptlang.org (https://www.typescriptlang.org/download/)',
              description: 'TypeScript',
            },
          ],
        },
        groupsIds: [],
        tags: [],
        homeworkAttempts: [
          {
            id: 1,
            comment:
              'https://github.com/DmitriyFilimonov/DoubleLinkedList_TypeScript',
            author: {
              id: 127,
              firstName: 'Кеша',
              lastName: 'Попугай',
              userPic:
                'https://i.pinimg.com/originals/ee/fa/54/eefa54fbe930758a9e6139416e5001b3.png',
            },
            homeworkAttemptStatus: 'Ждет проверки',
            comments: [],
            attachments: [],
          },
          {
            id: 2,
            comment: 'https://github.com/DmitriyFilimonov/DataStructure_2',
            author: {
              id: 128,
              firstName: 'Dimon',
              lastName: 'Filimonov',
              userPic:
                'https://pbs.twimg.com/profile_images/910180358737424384/THenAPB7_400x400.jpg',
            },
            homeworkAttemptStatus: 'Ждет проверки',
            comments: [],
            attachments: [],
          },
        ],
        themes: [],
      },
      {
        id: 4,
        description:
          'Event loop. Асинхронность в браузере. https://developer.mozilla.org/ru/docs/Web/JavaScript/EventLoop',
        startDate: '04.05.2021',
        deadlineDate: '11.05.2021',
        isOptional: true,
        course: {
          id: 4,
          name: 'Frontend',
          description:
            'Специальный курс Frontend для студентов успешно прошедших базовый курс',
          duration: 0,
          isDeleted: false,
          materials: [
            {
              id: 1,
              link: 'https://htmlreference.io/',
              description: 'html',
            },
            {
              id: 3,
              link: 'http://getbootstrap.com ',
              description: 'bootstrap',
            },
            {
              id: 4,
              link:
                'www.typescriptlang.org (https://www.typescriptlang.org/download/)',
              description: 'TypeScript',
            },
          ],
        },
        groupsIds: [],
        tags: [],
        homeworkAttempts: [],
        themes: [],
      },
    ]);
  },
});

export function* homeworkPageWatchers() {
  yield all([loadHomeworkListWatcher(), appointHomeworkPageSagaWatcher()]);
}

export function* loadHomeworkListWatcher() {
  yield takeLatest(GET_HOMEWORKS, loadHomeworkListSaga);
}

export function* loadHomeworkListSaga({
  payload,
}: ReturnType<typeof getHomeworks>) {
  yield put(setIsLoading());
  alert();
  try {
    const homeworks: Homework[] = yield call(async () =>
      sendGetRequest<Homework[]>(`${homeworkUrl}`, isHomeworkArr).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworks);

    if (error) yield put(constructNotificationError(error));
    else yield put(loadHomeworkSuccess(homeworks, payload));
  } catch {
    console.log('error loadHomeworkListSagas');
  }
  yield put(setIsLoaded());
}

export function* appointHomeworkPageSagaWatcher() {
  yield takeLatest(APPOINT_HOMEWORK, appointHomeworkPageSagaWorker);
}

export function* appointHomeworkPageSagaWorker({
  payload,
}: ReturnType<typeof appointHomework>) {
  try {
    const homeworkAppointmentResponse: Homework = yield call(async () =>
      sendPostRequest<Homework>(`${homeworkUrl}`, isHomework, payload).then(
        (response) => response
      )
    );
    const error = tryGetErrorFromResponse(homeworkAppointmentResponse);

    if (error) yield put(constructNotificationError(error));
    else
      yield put(
        constructSuccessNotification(
          `Домашнее задание ${homeworkAppointmentResponse.description} назначено`
        )
      );
  } catch {
    console.log('error appointHomeworkPageSaga');
  }
}
