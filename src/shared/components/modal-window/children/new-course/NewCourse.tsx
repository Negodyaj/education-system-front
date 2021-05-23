import React, { ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { CourseInput } from '../../../../../interfaces/CourseInput';

interface NewCourseProps {
  children: ReactElement<CourseInput> | ReactElement<CourseInput>[];
}

function NewCourse(props: NewCourseProps) {
  const { children } = props;
  const dispatch = useDispatch();
  const formCourse = useForm<CourseInput>();

  return <>{children}</>;
}
export default NewCourse;
