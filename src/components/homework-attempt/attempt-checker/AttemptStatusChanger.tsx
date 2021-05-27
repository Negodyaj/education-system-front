import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { InputNames } from '../../../enums/inputNames';
import { AttemptPut } from '../../../interfaces/AttemptPut';
import FormElement from '../../../shared/components/form-elements/FormElement';
import { getAttemptCheckFormElementSettings } from '../../../shared/helpers/attemptCheckFormRegisterSettings';
import { IRootState } from '../../../store';
import { CommonButton } from '../../group-page/lesson-list-component/LessonsByGroupStyled';

const AttemptStatusChanger = () => {
  const { homeworkAttempt } = useSelector((state: IRootState) => state);
  const { currentAttempt, attemptUpdate } = homeworkAttempt;
  const { ...methods } = useForm<AttemptPut>();
  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form>
        {Object.keys({
          homeworkAttemptStatusId: attemptUpdate.homeworkAttemptStatusId,
        }).map((key) => (
          <FormElement
            formElementSettings={getAttemptCheckFormElementSettings(
              key as InputNames
            )}
            key={key}
          />
        ))}
        <CommonButton onClick={methods.handleSubmit(onSubmit)}>
          Сохранить
        </CommonButton>
      </form>
    </FormProvider>
  );
};
export default AttemptStatusChanger;
