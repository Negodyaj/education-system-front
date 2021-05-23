import { Dispatch } from 'redux';

import { Course } from '../../interfaces/Courses';
import { Themes } from '../../interfaces/Themes';
import { isCourse } from '../../services/type-guards/course';
import { isThemesArr } from '../../services/type-guards/themesArr';
import { coursesUrl, themesUrl } from '../../shared/consts';
import { thunkResponseHandler } from '../thunkResponseHadlers';
import { pushNotification } from '../notifications/action-creators';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import {
  sendDeleteRequestNoResponse,
  sendGetRequest,
  sendPostRequestNoResponse,
} from '../../services/http.service';
import { CourseTheme } from '../../components/courses-page/course-edition/program-course/ProgramCourse';
import { CourseMaterial } from '../../components/courses-page/course-edition/materials-course/MaterialsCourse';

import {
  getCourseById,
  setCourseEditionFailAction,
  setCourseEditionIsLoadingAction,
  getAllThemes,
} from './action-creators';

export const getThemes = () => (dispatch: Dispatch) => {
  dispatch(setCourseEditionIsLoadingAction());
  sendGetRequest<Themes[]>(themesUrl, isThemesArr)
    .then((themes) => {
      dispatch(getAllThemes(thunkResponseHandler(dispatch, themes)));
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
