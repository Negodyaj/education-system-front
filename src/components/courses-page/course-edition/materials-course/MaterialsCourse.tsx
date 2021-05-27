import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';
import { IRootState } from '../../../../store';
import { setChangeDisplayingButtonOpenMaterialsCourse } from '../../../../store/course-edition/action-creators';

import CourseMaterials from './course-materials/CourseMaterials';
import AllMaterials from './materials/AllMaterials';
import {
  MaterialsCourseContainer,
  MaterialsCourseContent,
  MaterialsCourseHeader,
  MaterialsCourseHeaderText,
} from './MaterialsCourseStyled';

export interface CourseMaterial {
  idCourse: number;
  idMaterial: number;
}

const MaterialsCourse = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);

  const openMaterialsCourse = () => {
    dispatch(setChangeDisplayingButtonOpenMaterialsCourse());
  };

  return (
    <MaterialsCourseContainer>
      <MaterialsCourseHeader>
        <RoundButton onClick={openMaterialsCourse}>
          {pageState.isDisplayingButtonOpenMaterialsCourse ? (
            <FontAwesomeIcon icon="angle-down" />
          ) : (
            <FontAwesomeIcon icon="angle-up" />
          )}
        </RoundButton>
        <MaterialsCourseHeaderText>Материалы курса</MaterialsCourseHeaderText>
      </MaterialsCourseHeader>
      {pageState.isDisplayingButtonOpenMaterialsCourse && (
        <MaterialsCourseContent>
          <AllMaterials />
          <CourseMaterials />
        </MaterialsCourseContent>
      )}
    </MaterialsCourseContainer>
  );
};

export default MaterialsCourse;
