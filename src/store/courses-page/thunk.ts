import { Dispatch } from 'redux';

import { CourseInput } from '../../interfaces/CourseInput';
import { Course } from '../../interfaces/Courses';
import {
  sendDeleteRequest,
  sendGetRequest,
  sendPostRequest,
} from '../../services/http.service';
import { isCourse } from '../../services/type-guards/course';
import { isCourseArr } from '../../services/type-guards/courseArr';
import { coursesUrl } from '../../shared/consts';
import { makeNotification } from '../../shared/helpers/notificationHelpers';
import { pushNotification } from '../notifications/action-creators';
import { thunkResponseHandler } from '../thunkResponseHadlers';

import {
  setCoursesListFail,
  setCoursesListIsLoadingAction,
  setCoursesListWasLoadedAction,
  showToggleModalCreateCourseAction,
  showToggleModalDeleteCourseAction,
} from './action-creators';

const url = 'url';

export const getCourses = () => (dispatch: Dispatch) => {
  dispatch(setCoursesListIsLoadingAction());
  sendGetRequest<Course[]>(coursesUrl, isCourseArr)
    .then((courses) => dispatch(setCoursesListWasLoadedAction(courses)))
    .catch((error) => dispatch(setCoursesListFail(error)));
};

// export const deleteCourse = (id: number) => (dispatch: Dispatch<any>) => {
//   sendDeleteRequest<Course>(`${coursesUrl}/${id}`, isCourse)
//     .then((course) => {
//       const response = thunkResponseHandler(dispatch, course);
//       response &&
//         dispatch(
//           pushNotification(
//             makeNotification(
//               'success',
//               `Курс ${(response as Course).name} успешно удален`
//             )
//           )
//         );
//       dispatch(showToggleModalDeleteCourseAction(response.id));
//       dispatch(getCourses());
//     })
//     .catch((error) => dispatch(setCoursesListFail(error)));
// };

export const createCourse = (newCourse: CourseInput) => (
  dispatch: Dispatch<any>
) => {
  sendPostRequest<Course>(`${coursesUrl}`, isCourse, {
    ...newCourse,
    duration: +newCourse.duration,
  })
    .then((course) => {
      const response = thunkResponseHandler(dispatch, course);
      response &&
        dispatch(
          pushNotification(
            makeNotification(
              'success',
              `Курс ${(response as Course).name} успешно создан`
            )
          )
        );
      dispatch(showToggleModalCreateCourseAction());
      dispatch(getCourses());
    })
    .catch((error) => dispatch(setCoursesListFail(error)));
};
