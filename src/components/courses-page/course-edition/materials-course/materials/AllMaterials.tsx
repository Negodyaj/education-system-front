import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { Material } from '../../../../../interfaces/Materials';
import SearchComponent from '../../../../../shared/components/search-component/SearchComponent';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import {
  setIsOpenModalDeleteMaterial,
  setSelectedMaterial,
} from '../../../../../store/course-edition/action-creators';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';

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
import ModalDeleteMaterial from './ModalDeleteMaterial';

const AllMaterials = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  const [searchWord, setSearchWord] = useState('');

  const searchInThemes = (str: string) => {
    setSearchWord(str);
  };

  const openUpModalCreateMaterial = () => {
    dispatch(toggleModalWindow(ChildIndex.NewMaterial));
  };

  const openModalDeleteMaterial = () => {
    dispatch(setIsOpenModalDeleteMaterial());
  };

  const rememberMaterial = (material: Material) => {
    dispatch(setSelectedMaterial(material));
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
          {pageState.currentMaterial.id > 0 ? (
            <RoundButton onClick={openModalDeleteMaterial}>
              <FontAwesomeIcon icon="trash" />
            </RoundButton>
          ) : (
            <div />
          )}
          <RoundButton onClick={openUpModalCreateMaterial}>
            <FontAwesomeIcon icon="plus" />
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
            <MaterialPosition
              onClick={() => {
                rememberMaterial(material);
              }}
              tabIndex={0}
              key={material.id}
              title={material.description}>
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
      {pageState.isOpenModalDeleteMaterial && <ModalDeleteMaterial />}
    </AllMaterialsContainer>
  );
};

export default AllMaterials;
