import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { Themes } from '../../../../../interfaces/Themes';
import SearchComponent from '../../../../../shared/components/search-component/SearchComponent';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import {
  setIsOpenModalDeleteTheme,
  setSelectedTheme,
} from '../../../../../store/course-edition/action-creators';
import { addThemeInCourse } from '../../../../../store/course-edition/thunk';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';
import { CourseTheme } from '../ProgramCourse';

import {
  AddingNewThemeInCourse,
  AllThemesHeader,
  ButtonAddingNewThemeInCourse,
  ButtonGroup,
  TextForHeaders,
  ThemePosition,
  ThemePositionName,
  ThemesContainer,
  ThemesContent,
} from './AllThemesStyled';
import ModalDeleteTheme from './ModalDeleteTheme';

const AllThemes = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  /* useEffect(() => {
    checkThemes();
  }, [pageState.course.themes]); */

  const [searchWord, setSearchWord] = useState('');

  const addNewThemeInProgramCourse = (theme: Themes) => {
    if (checkTheThemeInTheCourse(theme.id)) {
      const courseTheme: CourseTheme = {
        idCourse: pageState.idCourse,
        idTheme: theme.id,
      };
      dispatch(addThemeInCourse(courseTheme));
    }
  };

  const checkTheThemeInTheCourse = (themeId: number): boolean => {
    const theme = pageState.course.themes.find((t) => t.id === themeId);

    return theme === undefined;
  };

  /* const checkThemes = () => {
        pageState.course.themes.map((theme) => themesInCourse.push(theme.id));
        dispatch(setAllThemesInCourse(themesInCourse));
      }; */

  const searchInThemes = (str: string) => {
    setSearchWord(str);
  };

  const openUpModalCreateTheme = () => {
    dispatch(toggleModalWindow(ChildIndex.NewTheme));
  };

  const openModalDeleteTheme = () => {
    dispatch(setIsOpenModalDeleteTheme());
  };

  const rememberTheme = (theme: Themes) => {
    dispatch(setSelectedTheme(theme));
  };

  return (
    <ThemesContainer>
      <AllThemesHeader>
        <TextForHeaders>Темы</TextForHeaders>
        <ButtonGroup>
          {pageState.currentTheme.id > 0 ? (
            <RoundButton onClick={openModalDeleteTheme}>
              <FontAwesomeIcon icon="trash" />
            </RoundButton>
          ) : (
            <div />
          )}
          <RoundButton onClick={openUpModalCreateTheme}>
            <FontAwesomeIcon icon="plus" />
          </RoundButton>
        </ButtonGroup>
      </AllThemesHeader>
      <ThemesContent>
        <SearchComponent funcSearch={searchInThemes} />
        {pageState.themes
          .filter((theme) =>
            theme.name.toLowerCase().includes(searchWord.toLowerCase())
          )

          .map((theme) => (
            <ThemePosition
              onClick={() => {
                rememberTheme(theme);
              }}
              tabIndex={0}
              key={theme.id}>
              <ThemePositionName>{theme.name}</ThemePositionName>
              <AddingNewThemeInCourse>
                <ButtonAddingNewThemeInCourse
                  onClick={() => addNewThemeInProgramCourse(theme)}>
                  {pageState.idThemesCourse.includes(theme.id) ? (
                    <FontAwesomeIcon icon="check" />
                  ) : (
                    <FontAwesomeIcon icon="plus" />
                  )}
                </ButtonAddingNewThemeInCourse>
              </AddingNewThemeInCourse>
            </ThemePosition>
          ))}
      </ThemesContent>
      {pageState.isOpenModalDeleteTheme && <ModalDeleteTheme />}
    </ThemesContainer>
  );
};

export default AllThemes;
