import React, { ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { CourseInput } from '../../../../../interfaces/CourseInput';
import { createCourse } from '../../../../../store/courses-page/thunk';

interface NewCourseProps {
  children: ReactElement<CourseInput> | ReactElement<CourseInput>[];
}

function NewCourse(props: NewCourseProps) {
  const { children } = props;
  const dispatch = useDispatch();
  const formCourse = useForm<CourseInput>();

  const onSubmit = (dataCourse: CourseInput) => {
    dispatch(createCourse(dataCourse));
  };

  return <>{children}</>;
}
export default NewCourse;
