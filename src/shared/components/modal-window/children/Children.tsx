import React from 'react';

import { ChildIndex } from '../../../../enums/ChildIndex';

import NewCourse from './new-course/NewCourse';

type Props = {
  childIndex: ChildIndex;
};

export const Children = (props: Props) => {
  const { childIndex } = props;

  switch (childIndex) {
    case 'new-course':
      return <NewCourse />;
  }

  return null;
};
