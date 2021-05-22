import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { InputNames } from '../../../../../enums/inputNames';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';
import FormElement from '../../../form-elements/FormElement';
import {
  FormWrapper,
  InputStyle,
  SelectDelete,
} from '../../ModalWindowCreateFormStyled';

import { selectFormSetting } from './form-setting-selector';
import { selectOnSubmit } from './on-submit-selector';

interface FormChildProps<T> {
  defaultValues: T;
  childIndex: ChildIndex;
}

export function FormChild<T>(props: FormChildProps<T>) {
  const { defaultValues, childIndex } = props;
  const methods = useForm<T>(defaultValues);
  const dispatch = useDispatch();
  const onSubmit = selectOnSubmit(childIndex, dispatch);

  return (
    <>
      <FormProvider {...methods}>
        <InputStyle>
          {Object.keys(defaultValues || {}).map((key) => (
            <FormElement
              key={key}
              formElementSettings={
                selectFormSetting(childIndex, key as InputNames) || undefined
              }
            />
          ))}
          <SelectDelete>
            <button
              className="common-button"
              onClick={() => dispatch(toggleModalWindow(ChildIndex.Closed))}>
              Отменить
            </button>
            <button
              className="common-button"
              onClick={methods.handleSubmit(onSubmit)}>
              Добавить
            </button>
          </SelectDelete>
        </InputStyle>
      </FormProvider>
    </>
  );
}
