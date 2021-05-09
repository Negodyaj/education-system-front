import { Dispatch } from 'redux';

import { Course } from '../../interfaces/Courses';
import { Themes } from '../../interfaces/Themes';
import {
  sendDeleteRequestNoResponse,
  sendGetRequest,
  sendPostRequest,
  sendPostRequestNoResponse,
} from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { isThemesArr } from '../../services/type-guards/themesArr';
import { coursesUrl, themesUrl } from '../../shared/consts';
import {
  CourseMaterial,
  CourseTheme,
} from '../../components/courses-page/course-edition/CourseEdition';
import { thunkResponseHandler } from '../thunkResponseHadlers';
import { pushNotification } from '../notifications/action-creators';
import { makeNotification } from '../../shared/helpers/notificationHelpers';

import {
  getCourseByIdLoaded,
  setCourseEditionFailAction,
  setCourseEditionIsLoadingAction,
  setCourseEditionWasLoadedAction,
} from './action-creators';

export const getThemes = () => (dispatch: Dispatch) => {
  dispatch(setCourseEditionIsLoadingAction());
  sendGetRequest<Themes[]>(themesUrl, isThemesArr)
    .then((themes) => {
      dispatch(
        setCourseEditionWasLoadedAction(thunkResponseHandler(dispatch, themes))
      );
    })
    .catch((error) => dispatch(setCourseEditionFailAction(error)));
};

export const getCourseById = (id: number) => (dispatch: Dispatch) => {
  sendGetRequest<Course>(`${coursesUrl}/${id}`, isCourse)
    .then((course) => {
      dispatch(getCourseByIdLoaded(thunkResponseHandler(dispatch, course)));
    })
    .catch((error) => dispatch(setCourseEditionFailAction(error)));
};

export const addThemeInCourse = (courseTheme: CourseTheme) => (
  dispatch: Dispatch<any>
) => {
  sendPostRequestNoResponse(
    `${coursesUrl}/${courseTheme.idCourse}/theme/${courseTheme.idTheme}`
  )
    .then((data) => {
      dispatch(getCourseById(courseTheme.idCourse));
      dispatch(
        pushNotification(
          makeNotification('success', `Тема успешно добавлена в курс`)
        )
      );
    })
    .catch((error) => dispatch(setCourseEditionFailAction(error)));
};

export const deleteThemeCourse = (courseTheme: CourseTheme) => (
  dispatch: Dispatch<any>
) => {
  sendDeleteRequestNoResponse(
    `${coursesUrl}/${courseTheme.idCourse}/theme/${courseTheme.idTheme}`
  )
    .then((data) => {
      dispatch(getCourseById(courseTheme.idCourse));
      dispatch(
        pushNotification(
          makeNotification('success', `Тема успешно удалена из курса`)
        )
      );
    })
    .catch((error) => dispatch(setCourseEditionFailAction(error)));
};

export const deleteMaterialCourse = (courseMaterial: CourseMaterial) => (
  dispatch: Dispatch<any>
) => {
  sendDeleteRequestNoResponse(
    `${coursesUrl}/${courseMaterial.idCourse}/material/${courseMaterial.idMaterial}`
  )
    .then((data) => {
      dispatch(getCourseById(courseMaterial.idCourse));
      dispatch(
        pushNotification(
          makeNotification('success', `Материал успешно удален из курса`)
        )
      );
    })
    .catch((error) => dispatch(setCourseEditionFailAction(error)));
};
