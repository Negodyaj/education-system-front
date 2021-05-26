import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../../../store';
import {
  getCourseById,
  getMaterials,
  getThemes,
  setIdCourse,
} from '../../../store/course-edition/action-creators';

import {
  CourseEditionContainer,
  CourseNameHeader,
  CourseUpdate,
} from './CourseEditionStyled';
import ProgramCourse from './program-course/ProgramCourse';
import MaterialsCourse from './materials-course/MaterialsCourse';

interface ParamTypes {
  id: string;
}

const CourseEdition = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);
  const { id } = useParams<ParamTypes>();

  const idCourse = +id;

  useEffect(() => {
    dispatch(getThemes());
    dispatch(getMaterials());
    dispatch(getCourseById(idCourse));
    dispatch(setIdCourse(idCourse));
  }, []);

  return (
    <CourseEditionContainer>
      <CourseNameHeader>{`Курс ${pageState.course.name}`}</CourseNameHeader>
      <CourseUpdate>
        <ProgramCourse />
        <MaterialsCourse />
      </CourseUpdate>
    </CourseEditionContainer>
  );
};

export default CourseEdition;
