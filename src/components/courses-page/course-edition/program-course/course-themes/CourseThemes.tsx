import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeInCourse } from '../../../../../interfaces/ThemeInCourse';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import {
  changeArrThemesInCourse,
  setChangeDisplayingButtonsToChangeThemePosition,
} from '../../../../../store/course-edition/action-creators';

import {
  ButtonDeleteThemeFromCourse,
  CourseThemeChangePosition,
  CourseThemeDelete,
  CourseThemeName,
  CourseThemePosition,
  CourseThemesContainer,
  TextForHeaders,
} from './CourseThemesStyled';

const CourseThemes = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  const arrIdThemesInCourse: number[] = pageState.idThemesCourse;

  const showButtonsToChangeThemesPosition = () => {
    dispatch(setChangeDisplayingButtonsToChangeThemePosition());
  };

  const deleteThemeFromCourse = (idTheme: number) => {
    arrIdThemesInCourse.splice(arrIdThemesInCourse.indexOf(idTheme), 1);
    sendDataToChangeTheListOfThemes(arrIdThemesInCourse);
  };

  const changePositionUp = (idTheme: number) => {
    const index = arrIdThemesInCourse.indexOf(idTheme);
    const tmp = arrIdThemesInCourse[index];
    arrIdThemesInCourse[index] = arrIdThemesInCourse[index - 1];
    arrIdThemesInCourse[index - 1] = tmp;
    sendDataToChangeTheListOfThemes(arrIdThemesInCourse);
  };

  const changePositionDown = (idTheme: number) => {
    const index = arrIdThemesInCourse.indexOf(idTheme);
    const tmp = arrIdThemesInCourse[index];
    arrIdThemesInCourse[index] = arrIdThemesInCourse[index + 1];
    arrIdThemesInCourse[index + 1] = tmp;
    sendDataToChangeTheListOfThemes(arrIdThemesInCourse);
  };

  const sendDataToChangeTheListOfThemes = (arrIdThemes: number[]) => {
    let arrThemes: ThemeInCourse[] = [];
    for (let i = 0; i < arrIdThemes.length; i++) {
      arrThemes.push({
        id: arrIdThemes[i],
        order: i + 1,
      });
    }
    dispatch(changeArrThemesInCourse(arrThemes));
  };

  return (
    <CourseThemesContainer>
      <TextForHeaders>Темы добавленные в курс</TextForHeaders>
      {pageState.course.themes.map((theme) => (
        <CourseThemePosition
          onClick={() => {
            showButtonsToChangeThemesPosition();
          }}
          tabIndex={0}
          key={theme.id}>
          <CourseThemeName>{theme.name}</CourseThemeName>
          <CourseThemeDelete>
            <ButtonDeleteThemeFromCourse
              onClick={() => deleteThemeFromCourse(theme.id)}>
              <FontAwesomeIcon icon="minus" />
            </ButtonDeleteThemeFromCourse>
          </CourseThemeDelete>
          {pageState.isDisplayingButtonsToChangeThemePosition ? (
            <CourseThemeChangePosition>
              <RoundButton
                onClick={() => {
                  changePositionUp(theme.id);
                }}>
                <FontAwesomeIcon icon="arrow-up" />
              </RoundButton>
              <RoundButton
                onClick={() => {
                  changePositionDown(theme.id);
                }}>
                <FontAwesomeIcon icon="arrow-down" />
              </RoundButton>
            </CourseThemeChangePosition>
          ) : (
            <div />
          )}
        </CourseThemePosition>
      ))}
    </CourseThemesContainer>
  );
};

export default CourseThemes;
