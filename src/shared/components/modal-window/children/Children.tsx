import { ReactElement } from 'react';

import PaymentForm from '../../../../components/user-list-page/payment-form/PaymentForm';
import { ChildIndex } from '../../../../enums/ChildIndex';

import NewCourse from './new-course/NewCourse';

type Props = {
  childIndex: ChildIndex;
  children: ReactElement;
};

export function Children(props: Props) {
  const { childIndex, children } = props;

  switch (childIndex) {
    case 'new-course':
      return <NewCourse>{children}</NewCourse>;
    case 'payment':
      return <PaymentForm>{children}</PaymentForm>;
  }

  return null;
}
