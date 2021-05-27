import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { Material } from '../../../../../interfaces/Materials';
import SearchComponent from '../../../../../shared/components/search-component/SearchComponent';
import { RoundButton } from '../../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../../store';
import {
  addMaterialInCourse,
  setAllMaterialsInCourse,
  setIsOpenModalDeleteMaterial,
  setSelectedMaterial,
} from '../../../../../store/course-edition/action-creators';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';
import { CourseMaterial } from '../MaterialsCourse';

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
  const materialsInCourse: number[] = [];

  useEffect(() => {
    checkMaterials();
  }, [pageState.course.materials]);

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

  const addNewMaterialInCourse = (id: number) => {
    if (checkTheMaterialInTheCourse(id)) {
      const courseMaterial: CourseMaterial = {
        idCourse: pageState.idCourse,
        idMaterial: id,
      };
      dispatch(addMaterialInCourse(courseMaterial));
    }
  };

  const checkTheMaterialInTheCourse = (materialId: number): boolean => {
    const material = pageState.course.materials.find(
      (t) => t.id === materialId
    );

    return material === undefined;
  };

  const checkMaterials = () => {
    pageState.course.materials.map((material) =>
      materialsInCourse.push(material.id)
    );
    dispatch(setAllMaterialsInCourse(materialsInCourse));
  };

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
                  onClick={() => addNewMaterialInCourse(material.id)}>
                  {pageState.idMaterialsCourse.includes(material.id) ? (
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
