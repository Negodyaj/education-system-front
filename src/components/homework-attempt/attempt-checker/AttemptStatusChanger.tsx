import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { InputNames } from '../../../enums/inputNames';
import { AttemptPut } from '../../../interfaces/AttemptPut';
import FormElement from '../../../shared/components/form-elements/FormElement';
import { getAttemptCheckFormElementSettings } from '../../../shared/helpers/attemptCheckFormRegisterSettings';
import { IRootState } from '../../../store';
import { updateAttempt } from '../../../store/homework-attempt/action-creators';
import { CommonButton } from '../../group-page/lesson-list-component/LessonsByGroupStyled';

const AttemptStatusChanger = () => {
  const dispatch = useDispatch();
  const { homeworkAttempt } = useSelector((state: IRootState) => state);
  const { currentHomework, attemptUpdate, currentAttempt } = homeworkAttempt;
  const hwId = currentHomework?.id || 0;
  const attemptId = currentAttempt?.id || 0;
  const { ...methods } = useForm<AttemptPut>();
  const onSubmit = (data: AttemptPut) => {
    const updatedAttempt: AttemptPut = {
      authorId: currentAttempt?.author.id || 0,
      comment: currentAttempt?.comment || '',
      homeworkAttemptStatusId: data.homeworkAttemptStatusId,
    };
    dispatch(updateAttempt(hwId, updatedAttempt, attemptId));
  };

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
