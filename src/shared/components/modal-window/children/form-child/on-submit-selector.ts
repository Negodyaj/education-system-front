import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { AppointInput } from '../../../../../interfaces/AppointInput';
import { CourseInput } from '../../../../../interfaces/CourseInput';
import { IRootState } from '../../../../../store';
import { createCourse } from '../../../../../store/courses-page/thunk';
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
  }

  return (arg: any) => {};
}
