import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { PaymentInput } from '../../../../../components/interfaces/PaymentInput';
import { ChildIndex } from '../../../../../enums/ChildIndex';
import { AppointInput } from '../../../../../interfaces/AppointInput';
import { CourseInput } from '../../../../../interfaces/CourseInput';
import { LessonInput } from '../../../../../interfaces/LessonInput';
import { LessonUpdate } from '../../../../../interfaces/LessonUpdate';
import { MaterialInput } from '../../../../../interfaces/MaterialInput';
import { ThemeInput } from '../../../../../interfaces/ThemeInput';
import { IRootState } from '../../../../../store';
import {
  createMaterial,
  createTheme,
} from '../../../../../store/course-edition/action-creators';
import { createCourse } from '../../../../../store/courses-page/action-creators';
import {
  createLesson,
  updateLesson,
} from '../../../../../store/group-page/lesson/action-creators';
import { appointHomework } from '../../../../../store/homework-page/action-creators';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';
import { createPaymentWatcher } from '../../../../../store/payment/action-creators';

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
    case ChildIndex.NewTheme:
      return (dataTheme: ThemeInput) => {
        dispatch(createTheme(dataTheme));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
    case ChildIndex.NewMaterial:
      return (dataMaterial: MaterialInput) => {
        dispatch(createMaterial(dataMaterial));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
    case ChildIndex.Payment:
      return (dataPayment: PaymentInput) => {
        dispatch(createPaymentWatcher(dataPayment));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
  }

  return (arg: any) => {};
}
