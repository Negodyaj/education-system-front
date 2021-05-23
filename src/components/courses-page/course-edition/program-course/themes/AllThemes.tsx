import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Themes } from '../../../../../interfaces/Themes';
import SearchComponent from '../../../../../shared/components/search-component/SearchComponent';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import { addThemeInCourse } from '../../../../../store/course-edition/thunk';
import { CourseTheme } from '../ProgramCourse';

import {
  AddingNewThemeInCourse,
  AllThemesHeader,
  ButtonAddingNewThemeInCourse,
  TextForHeaders,
  ThemePosition,
  ThemePositionName,
  ThemesContainer,
  ThemesContent,
} from './AllThemesStyled';

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

  return (
    <ThemesContainer>
      <AllThemesHeader>
        <TextForHeaders>Темы для курса</TextForHeaders>
        <RoundButton>
          <FontAwesomeIcon icon="plus" />
        </RoundButton>
      </AllThemesHeader>
      <ThemesContent>
        <SearchComponent funcSearch={searchInThemes} />
        {pageState.themes
          .filter((item) =>
            item.name.toLowerCase().includes(searchWord.toLowerCase())
          )

          .map((item) => (
            <ThemePosition key={item.id}>
              <ThemePositionName>{item.name}</ThemePositionName>
              <AddingNewThemeInCourse>
                <ButtonAddingNewThemeInCourse
                  onClick={() => addNewThemeInProgramCourse(item)}>
                  {pageState.idThemesCourse.includes(item.id) ? (
                    <FontAwesomeIcon icon="check" />
                  ) : (
                    <FontAwesomeIcon icon="plus" />
                  )}
                </ButtonAddingNewThemeInCourse>
              </AddingNewThemeInCourse>
            </ThemePosition>
          ))}
      </ThemesContent>
    </ThemesContainer>
  );
};

export default AllThemes;
