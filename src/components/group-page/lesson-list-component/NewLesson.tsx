import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { IRootState } from '../../../store';
import FormElement from '../../../shared/components/form-elements/FormElement';
import { InputNames } from '../../../enums/inputNames';
import { setIsOpenModalAddLesson } from '../../../store/group-page/lesson/action-creators';
import { LessonInput } from '../../../interfaces/LessonInput';
import { createLesson } from '../../../store/group-page/lesson/thunk';
import { getLessonFormElementSettings } from '../../../shared/helpers/lessonFormRegisterSettingByKey';

import {
  ButtonCloseModalAddLesson,
  CommonButton,
  FormWrapper,
  HeadModalLesson,
  InputStyle,
  ModalAddLesson,
  ModalBackLesson,
  ModalHeaderAddLesson,
  SelectAddLessonOrCancel,
} from './NewLessonStyled';

interface DataNewLesson {
  groupId: 14;
  description: string;
  lessonDate: string;
  themesId?: number[];
}

const NewLesson = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);
  const {
    register,
    formState,
    handleSubmit,
    getValues,
    setValue,
    ...methods
  } = useForm<LessonInput>();

  const closeModalAddLesson = () => {
    dispatch(setIsOpenModalAddLesson());
  };

  const onSubmit = (dataLesson: LessonInput) => {
    const dataNewLesson: DataNewLesson = {
      groupId: 14,
      description: dataLesson.description,
      lessonDate: dataLesson.lessonDate,
      themesId: dataLesson.themesId,
    };
    dispatch(createLesson(dataNewLesson));
    console.log(dataNewLesson);
  };

  return (
    <ModalBackLesson>
      <ModalAddLesson>
        <ModalHeaderAddLesson>
          <HeadModalLesson>
            <h4>Запланировать занятие</h4>
          </HeadModalLesson>
          <ButtonCloseModalAddLesson onClick={closeModalAddLesson}>
            <FontAwesomeIcon icon="times" />
          </ButtonCloseModalAddLesson>
        </ModalHeaderAddLesson>
        <FormProvider
          register={register}
          formState={formState}
          handleSubmit={handleSubmit}
          getValues={getValues}
          setValue={setValue}
          {...methods}>
          <FormWrapper>
            <InputStyle onSubmit={handleSubmit(onSubmit)}>
              {Object.keys(appState.lessonByGroup.createLessonInputModel).map(
                (key) => (
                  <FormElement
                    key={key}
                    formElementSettings={getLessonFormElementSettings(
                      key as InputNames
                    )}
                  />
                )
              )}
            </InputStyle>
          </FormWrapper>
        </FormProvider>
        <SelectAddLessonOrCancel>
          <CommonButton onClick={closeModalAddLesson}>Отменить</CommonButton>
          <CommonButton onClick={handleSubmit(onSubmit)}>Добавить</CommonButton>
        </SelectAddLessonOrCancel>
      </ModalAddLesson>
    </ModalBackLesson>
  );
};

export default NewLesson;
