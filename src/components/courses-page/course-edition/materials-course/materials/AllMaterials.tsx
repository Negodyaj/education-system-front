import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchComponent from '../../../../../shared/components/search-component/SearchComponent';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';

import {
  AddingNewMaterialInCourse,
  AllMaterialsContainer,
  AllMaterialsHeader,
  ButtonAddingNewMaterialInCourse,
  MaterialPosition,
  MaterialPositionName,
  MaterialsContent,
  TextForHeaders,
} from './AllMaterialsStyled';

const AllMaterials = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  const [searchWord, setSearchWord] = useState('');

  const searchInThemes = (str: string) => {
    setSearchWord(str);
  };

  /* const addNewThemeInProgramCourse = (theme: Themes) => {
          if (checkTheThemeInTheCourse(theme.id)) {
              const courseTheme: CourseTheme = {
                  idCourse: pageState.idCourse,
                  idTheme: theme.id,
              };
              dispatch(addThemeInCourse(courseTheme));
          }
      }; */

  return (
    <AllMaterialsContainer>
      <AllMaterialsHeader>
        <TextForHeaders>Темы для курса</TextForHeaders>
        <RoundButton>
          <FontAwesomeIcon icon="plus" />
        </RoundButton>
      </AllMaterialsHeader>
      <MaterialsContent>
        <SearchComponent funcSearch={searchInThemes} />
        {pageState.themes
          .filter((item) =>
            item.name.toLowerCase().includes(searchWord.toLowerCase())
          )

          .map((item) => (
            <MaterialPosition key={item.id}>
              <MaterialPositionName>{item.name}</MaterialPositionName>
              <AddingNewMaterialInCourse>
                <ButtonAddingNewMaterialInCourse
                /* onClick={() => addNewThemeInProgramCourse(item)} */
                >
                  {pageState.idThemesCourse.includes(item.id) ? (
                    <FontAwesomeIcon icon="check" />
                  ) : (
                    <FontAwesomeIcon icon="plus" />
                  )}
                </ButtonAddingNewMaterialInCourse>
              </AddingNewMaterialInCourse>
            </MaterialPosition>
          ))}
      </MaterialsContent>
    </AllMaterialsContainer>
  );
};

export default AllMaterials;
