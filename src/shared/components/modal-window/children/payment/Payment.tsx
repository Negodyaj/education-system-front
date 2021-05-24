import { ReactNode } from 'react';

interface NewCourseProps {
  children: ReactNode;
}

function NewCourse(props: NewCourseProps) {
  const { children } = props;

  return <>{children}</>;
}

export default NewCourse;
