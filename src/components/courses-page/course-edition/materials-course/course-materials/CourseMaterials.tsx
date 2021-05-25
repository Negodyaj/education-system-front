import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Material } from '../../../../../interfaces/Materials';
import { IRootState } from '../../../../../store';
import { deleteMaterialCourse } from '../../../../../store/course-edition/thunk';
import { CourseMaterial } from '../MaterialsCourse';

import {
  ButtonDeleteMaterialFromCourse,
  ContentCurrentMaterial,
  CourseMaterialDelete,
  CourseMaterialPosition,
  CourseMaterialsContainer,
  LinkOnMaterial,
  TextForHeaders,
} from './CourseMaterialsStyled';

const CourseMaterials = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  const deleteMaterialFromCourse = (material: Material) => {
    const courseMaterial: CourseMaterial = {
      idCourse: pageState.idCourse,
      idMaterial: material.id,
    };
    dispatch(deleteMaterialCourse(courseMaterial));
  };

  return (
    <CourseMaterialsContainer>
      <TextForHeaders>Материалы добавленные в курс</TextForHeaders>
      {pageState.course.materials.map((material) => (
        <CourseMaterialPosition key={material.id}>
          <ContentCurrentMaterial>
            <LinkOnMaterial
              href={material.link}
              title={material.link}
              target="_blank"
              rel="noreferrer">
              {material.description}
            </LinkOnMaterial>
          </ContentCurrentMaterial>
          <CourseMaterialDelete>
            <ButtonDeleteMaterialFromCourse
              onClick={() => deleteMaterialFromCourse(material)}>
              <FontAwesomeIcon icon="minus" />
            </ButtonDeleteMaterialFromCourse>
          </CourseMaterialDelete>
        </CourseMaterialPosition>
      ))}
    </CourseMaterialsContainer>
  );
};

export default CourseMaterials;
