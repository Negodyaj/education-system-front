import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ChildIndex } from '../../../../../enums/ChildIndex';
import { InputNames } from '../../../../../enums/inputNames';
import { IRootState } from '../../../../../store';
import { toggleModalWindow } from '../../../../../store/modal-window/action-creators';
import FormElement from '../../../form-elements/FormElement';
import { InputStyle, SelectDelete } from '../../ModalWindowCreateFormStyled';

import { selectFormSetting } from './form-setting-selector';
import { selectOnSubmit } from './on-submit-selector';
import { getCurrentSelector, Selectors } from './selectCurrentSelector';

interface FormChildProps<T> {
  defaultValues: T;
  childIndex: ChildIndex;
}

export function FormChild<T>(props: FormChildProps<T>) {
  const { defaultValues, childIndex } = props;
  const appState = useSelector((state: IRootState) => state);
  const realDefaultValues = getCurrentSelector(childIndex)(appState);
  const methods = useForm<Selectors>({
    defaultValues: realDefaultValues,
  });
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<any> = selectOnSubmit(childIndex, dispatch);

  useEffect(() => {
    realDefaultValues &&
      Object.keys(realDefaultValues).map((key) =>
        methods.setValue(
          key as keyof Selectors,
          realDefaultValues[key as keyof Selectors]
        )
      );
  }, [realDefaultValues]);

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
