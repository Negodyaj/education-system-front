import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { showToggleModalCreateCourseAction } from '../../store/courses-page/action-creators';
import { createCourse } from '../../store/courses-page/thunk';
import FormElement from '../../shared/components/form-elements/FormElement';
import { InputNames } from '../../enums/inputNames';
import { IRootState } from '../../store';
import { CourseInput } from '../../interfaces/CourseInput';
import { getUserFormElementSettings } from '../../shared/helpers/userFormRegisterSettingByKey';

import {
  ButtonClose,
  FormWrapper,
  HeadModal,
  InputStyle,
  ModalAddCourse,
  ModalBackground,
  ModalHeaderAddCourse,
  SelectDelete,
} from './NewCourseStyled';

function NewCourse() {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const {
    register,
    formState,
    handleSubmit,
    getValues,
    setValue,
    ...methods
  } = useForm<CourseInput>();

  const closeModalWindow = () => {
    dispatch(showToggleModalCreateCourseAction());
  };

  const createDataNewCourse = (dataNewCourse: CourseInput) => {
    dispatch(createCourse(dataNewCourse));
  };

  const onSubmit = (dataCourse: CourseInput) => {
    createDataNewCourse(dataCourse);
    console.log(dataCourse);
  };

  return (
    <ModalBackground>
      <ModalAddCourse>
        <ModalHeaderAddCourse>
          <HeadModal>
            <h4>Создать новый курс</h4>
          </HeadModal>
          <ButtonClose onClick={closeModalWindow}>
            <FontAwesomeIcon icon="times" />
          </ButtonClose>
        </ModalHeaderAddCourse>
        <FormProvider
          register={register}
          formState={formState}
          handleSubmit={handleSubmit}
          getValues={getValues}
          setValue={setValue}
          {...methods}>
          <FormWrapper>
            <InputStyle onSubmit={handleSubmit(onSubmit)}>
              {Object.keys(appState.coursePage.createCourseInputModel).map(
                (key) => (
                  <FormElement
                    key={key}
                    formElementSettings={getUserFormElementSettings(
                      key as InputNames
                    )}
                  />
                )
              )}
            </InputStyle>
          </FormWrapper>
        </FormProvider>
        <SelectDelete>
          <button className="common-button" onClick={closeModalWindow}>
            Отменить
          </button>
          <button className="common-button" onClick={handleSubmit(onSubmit)}>
            Добавить
          </button>
        </SelectDelete>
      </ModalAddCourse>
    </ModalBackground>
  );
}

export default NewCourse;
