import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { AppointInput } from '../../../../../interfaces/AppointInput';
import { CourseInput } from '../../../../../interfaces/CourseInput';
import { LessonInput } from '../../../../../interfaces/LessonInput';
import { LessonUpdate } from '../../../../../interfaces/LessonUpdate';
import { IRootState } from '../../../../../store';
import { createCourse } from '../../../../../store/courses-page/action-creators';
import {
  createLesson,
  updateLesson,
} from '../../../../../store/group-page/lesson/action-creators';
import { appointHomework } from '../../../../../store/homework-page/action-creators';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';

export function selectOnSubmit(index: ChildIndex, dispatch: Dispatch<any>) {
  switch (index) {
    case ChildIndex.NewCourse:
      return (dataCourse: CourseInput) => {
        dispatch(createCourse(dataCourse));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
    case ChildIndex.AppointHomework:
      return (data: AppointInput) => {
        dispatch(appointHomework(data));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
    case ChildIndex.NewLesson:
      return (dataLesson: LessonInput) => {
        dispatch(createLesson(dataLesson));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
    case ChildIndex.UpdateLesson:
      return (dataLesson: LessonUpdate) => {
        dispatch(updateLesson(dataLesson));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
  }

  return (arg: any) => {};
}
