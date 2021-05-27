import React, { ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { LessonUpdate } from '../../../../../interfaces/LessonUpdate';

interface LessonUpdateProps {
  children: ReactElement<LessonUpdate> | ReactElement<LessonUpdate>[];
}

function UpdateLesson(props: LessonUpdateProps) {
  const { children } = props;
  const dispatch = useDispatch();
  const formLesson = useForm<LessonUpdate>();

  return <>{children}</>;
}
export default UpdateLesson;
