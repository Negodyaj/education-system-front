import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { InputNames } from '../../../enums/inputNames';
import { HomeworkInput } from '../../../interfaces/HomeworkInput';
import FormElement from '../../../shared/components/form-elements/FormElement';
import { getUserFormElementSettings } from '../../../shared/helpers/userFormRegisterSettingByKey';
import { IRootState } from '../../../store';
import { addHomework } from '../../../store/homework-page/add-homework-modal/thunk';
import {
  AddHomeworkModalContainer,
  HomeworkModalContainer,
} from '../styled-components/st-components-for-modalw';

function AddHomeworkModal() {
  const {
    register,
    formState,
    handleSubmit,
    getValues,
    setValue,
    ...methods
  } = useForm<HomeworkInput>();
  const dispatch = useDispatch();
  const onSubmit = (data: HomeworkInput) => dispatch(addHomework(data));
  const addHomeWorkModal = useSelector(
    (state: IRootState) => state.addHomeWorkModal
  );
  const [modalVisibility, setVisibility] = useState(false);

  return (
    <HomeworkModalContainer>
      <AddHomeworkModalContainer
        marginTop={modalVisibility}
        onClick={() => setVisibility(!modalVisibility)}>
        <button className="button-close">
          <FontAwesomeIcon icon="times" />
        </button>
        <FormProvider
          register={register}
          formState={formState}
          handleSubmit={handleSubmit}
          getValues={getValues}
          setValue={setValue}
          {...methods}>
          <div className="needs-validation was-validated">
            <form onSubmit={handleSubmit(onSubmit)}>
              {Object.keys(addHomeWorkModal.defaultFormValue).map((key) => (
                <FormElement
                  formElementSettings={getUserFormElementSettings(
                    key as InputNames
                  )}
                  key={key}
                />
              ))}
              <div className="select-delete">
                <button className="button-select">Отменить</button>
                <button className="button-select" type="submit">
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </FormProvider>
      </AddHomeworkModalContainer>
    </HomeworkModalContainer>
  );
}

export default AddHomeworkModal;
