import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { InputNames } from '../../../enums/inputNames';
import { AttemptInput } from '../../../interfaces/AttemptInput';
import FormElement from '../../../shared/components/form-elements/FormElement';
import getAttemptFormElementSettings from '../../../shared/helpers/attemptFormRegisterSettingsByKey';
import { IRootState } from '../../../store';
import { sendAttempt } from '../../../store/homework-attempt/action-creators';

const AttemptCreator = () => {
  const methods = useForm<AttemptInput>();
  const { homeworkAttempt } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const onSubmit = (data: AttemptInput) => {
    console.log(data);
    dispatch(sendAttempt(data));
  };

  return (
    <FormProvider {...methods}>
      <div className="needs-validation was-validated">
        <form>
          {Object.keys(homeworkAttempt.defaultAttempt).map((key) => (
            <FormElement
              formElementSettings={getAttemptFormElementSettings(
                key as InputNames
              )}
              key={key}
            />
          ))}
          <div className="form-row form-row-button">
            <button
              className="common-button"
              type="button"
              onClick={() => onSubmit(methods.getValues())}>
              отправить
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AttemptCreator;
