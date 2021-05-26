import React, { ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { LessonInput } from '../../../../../interfaces/LessonInput';

interface NewLessonProps {
  children: ReactElement<LessonInput> | ReactElement<LessonInput>[];
}

function NewLesson(props: NewLessonProps) {
  const { children } = props;
  const dispatch = useDispatch();
  const formLesson = useForm<LessonInput>();

  return <>{children}</>;
}
export default NewLesson;
