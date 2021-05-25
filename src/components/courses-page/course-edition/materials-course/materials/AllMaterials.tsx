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
  ButtonGroup,
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
        <TextForHeaders>Материалы</TextForHeaders>
        <ButtonGroup>
          <RoundButton>
            <FontAwesomeIcon icon="plus" />
          </RoundButton>
          <RoundButton>
            <FontAwesomeIcon icon="trash" />
          </RoundButton>
        </ButtonGroup>
      </AllMaterialsHeader>
      <MaterialsContent>
        <SearchComponent funcSearch={searchInThemes} />
        {pageState.materials
          .filter((material) =>
            material.description
              .toLowerCase()
              .includes(searchWord.toLowerCase())
          )

          .map((material) => (
            <MaterialPosition key={material.id} title={material.description}>
              <MaterialPositionName>
                {material.description.length > 25
                  ? `${material.description.substr(0, 25)}...`
                  : material.description}
              </MaterialPositionName>
              <AddingNewMaterialInCourse>
                <ButtonAddingNewMaterialInCourse
                /* onClick={() => addNewThemeInProgramCourse(item)} */
                >
                  {pageState.idThemesCourse.includes(material.id) ? (
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
