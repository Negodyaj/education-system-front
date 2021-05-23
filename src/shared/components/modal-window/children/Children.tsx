import React, { ReactElement } from 'react';

import { ChildIndex } from '../../../../enums/ChildIndex';
import { CourseInput } from '../../../../interfaces/CourseInput';
import { ModalWindowSettings } from '../ModalWindow';

import { FormChild } from './form-child/FormChild';
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
  }

  return null;
}
