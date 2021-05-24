import { Dispatch } from 'redux';

import { PaymentInput } from '../../../../../components/interfaces/PaymentInput';
import { ChildIndex } from '../../../../../enums/ChildIndex';
import { CourseInput } from '../../../../../interfaces/CourseInput';
import { User } from '../../../../../interfaces/User';
import { createCourse } from '../../../../../store/courses-page/action-creators';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';
import { sendPayment } from '../../../../../store/payment/thunk';

export function selectOnSubmit(index: ChildIndex, dispatch: Dispatch<any>) {
  switch (index) {
    case ChildIndex.NewCourse:
      return (dataCourse: CourseInput) => {
        dispatch(createCourse(dataCourse));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
    case ChildIndex.Payment:
      return (userForPayment: User, newPayment: PaymentInput) => {
        dispatch(sendPayment(userForPayment, newPayment));
        dispatch(toggleModalWindow(ChildIndex.Closed));
      };
  }

  return (arg: any) => {};
}
