import { Dispatch } from 'redux';

import { PaymentInput } from '../../../../../components/interfaces/PaymentInput';
import { ChildIndex } from '../../../../../enums/ChildIndex';
import { CourseInput } from '../../../../../interfaces/CourseInput';
import { createCourse } from '../../../../../store/courses-page/action-creators';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';
import { createPaymentWatcher } from '../../../../../store/payment/action-creators';

export function selectOnSubmit(index: ChildIndex, dispatch: Dispatch<any>) {
  switch (index) {
    case ChildIndex.NewCourse:
      return (dataCourse: CourseInput) => {
        dispatch(createCourse(dataCourse));
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
