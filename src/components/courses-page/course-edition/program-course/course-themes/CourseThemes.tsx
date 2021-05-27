import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeInCourse } from '../../../../../interfaces/ThemeInCourse';
import { Themes } from '../../../../../interfaces/Themes';
import { IRootState } from '../../../../../store';
import { changeArrThemesInCourse } from '../../../../../store/course-edition/action-creators';
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

  const deleteThemeFromCourse = (idTheme: number) => {
    let arrIdThemesInCourse: number[] = pageState.idThemesCourse;
    let arrThemes: ThemeInCourse[] = [];
    arrIdThemesInCourse.splice(arrIdThemesInCourse.indexOf(idTheme), 1);
    for (let i = 0; i < arrIdThemesInCourse.length; i++) {
      arrThemes.push({
        id: arrIdThemesInCourse[i],
        order: i + 1,
      });
    }
    dispatch(changeArrThemesInCourse(arrThemes));
  };

  return (
    <CourseThemesContainer>
      <TextForHeaders>Темы добавленные в курс</TextForHeaders>
      {pageState.course.themes.map((theme) => (
        <CourseThemePosition key={theme.id}>
          <CourseThemeName>{theme.name}</CourseThemeName>
          <CourseThemeDelete>
            <ButtonDeleteThemeFromCourse
              onClick={() => deleteThemeFromCourse(theme.id)}>
              <FontAwesomeIcon icon="minus" />
            </ButtonDeleteThemeFromCourse>
          </CourseThemeDelete>
        </CourseThemePosition>
      ))}
    </CourseThemesContainer>
  );
};

export default CourseThemes;
