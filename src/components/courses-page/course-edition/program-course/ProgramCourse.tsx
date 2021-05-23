import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../store';
import { setChangeDisplayingButtonOpenProgramCourse } from '../../../../store/course-edition/action-creators';

import CourseThemes from './course-themes/CourseThemes';
import {
  ProgramCourseContainer,
  ProgramCourseContent,
  ProgramCourseHeader,
  ProgramCourseHeaderText,
} from './ProgramCourseStyled';
import AllThemes from './themes/AllThemes';

export interface CourseTheme {
  idCourse: number;
  idTheme: number;
}

const ProgramCourse = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  const themesInCourse: number[] = [];

  const openProgramCourse = () => {
    dispatch(setChangeDisplayingButtonOpenProgramCourse());
  };

  return (
    <ProgramCourseContainer>
      <ProgramCourseHeader>
        <RoundButton onClick={openProgramCourse}>
          {pageState.isDisplayingButtonOpenProgramCourse ? (
            <FontAwesomeIcon icon="angle-down" />
          ) : (
            <FontAwesomeIcon icon="angle-up" />
          )}
        </RoundButton>
        <ProgramCourseHeaderText>Программа курса</ProgramCourseHeaderText>
      </ProgramCourseHeader>
      {pageState.isDisplayingButtonOpenProgramCourse && (
        <ProgramCourseContent>
          <AllThemes />
          <CourseThemes />
        </ProgramCourseContent>
      )}
    </ProgramCourseContainer>
  );
};

export default ProgramCourse;
