import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Themes } from '../../../../../interfaces/Themes';
import { IRootState } from '../../../../../store';
import { deleteThemeCourse } from '../../../../../store/course-edition/thunk';
import { CourseTheme } from '../ProgramCourse';

import {
  ButtonDeleteThemeFromCourse,
  CourseThemeDelete,
  CourseThemeName,
  CourseThemePosition,
  CourseThemesContainer,
  TextForHeaders,
} from './CourseThemesStyled';

const CourseThemes = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  const deleteThemeFromCourse = (theme: Themes) => {
    const courseTheme: CourseTheme = {
      idCourse: pageState.idCourse,
      idTheme: theme.id,
    };
    dispatch(deleteThemeCourse(courseTheme));
  };

  return (
    <CourseThemesContainer>
      <TextForHeaders>Темы добавленные в курс</TextForHeaders>
      {pageState.course.themes.map((theme) => (
        <CourseThemePosition key={theme.id}>
          <CourseThemeName>{theme.name}</CourseThemeName>
          <CourseThemeDelete>
            <ButtonDeleteThemeFromCourse
              onClick={() => deleteThemeFromCourse(theme)}>
              <FontAwesomeIcon icon="minus" />
            </ButtonDeleteThemeFromCourse>
          </CourseThemeDelete>
        </CourseThemePosition>
      ))}
    </CourseThemesContainer>
  );
};

export default CourseThemes;
