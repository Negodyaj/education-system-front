import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import React from 'react';

import { CourseInput } from '../../../interfaces/CourseInput';
import { UserInput } from '../../../interfaces/UserInput';
import { FormElementSettings } from '../../helpers/userFormRegisterSettingByKey';
import FormElement from '../form-elements/FormElement';
import { PaymentInput } from '../../../components/interfaces/PaymentInput';
import { InputNames } from '../../../enums/inputNames';

import {
  ButtonClose,
  FormWrapper,
  HeadModal,
  ModalFormCreate,
  ModalBackground,
  SelectDelete,
  ModalHeader,
  InputStyle,
} from './ModalWindowCreateFormStyled';

interface CreateModalProps {
  headerName: string;
  objectKeysOnForm: CourseInput | UserInput | PaymentInput | any;
  form: UseFormReturn<any>;
  closeHandler: () => void;
  createFormElementOnType: (key: InputNames) => FormElementSettings;
  onSubmit: (data: CourseInput | UserInput | PaymentInput | any) => void;
}

const ModalWindowCreateForm = (props: CreateModalProps) => {
  const {
    headerName,
    objectKeysOnForm,
    closeHandler,
    createFormElementOnType,
    onSubmit,
    form,
  } = props;

  return (
    <ModalBackground>
      <ModalFormCreate>
        <ModalHeader>
          <HeadModal>
            <h4>{headerName}</h4>
          </HeadModal>
          <ButtonClose onClick={closeHandler}>
            <FontAwesomeIcon icon="times" />
          </ButtonClose>
        </ModalHeader>
        <FormProvider {...form}>
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <InputStyle>
              {Object.keys(objectKeysOnForm).map((key) => (
                <FormElement
                  key={key}
                  formElementSettings={createFormElementOnType(
                    key as InputNames
                  )}
                />
              ))}
            </InputStyle>
          </FormWrapper>
        </FormProvider>
        <SelectDelete>
          <button className="common-button" onClick={closeHandler}>
            Отменить
          </button>
          <button
            className="common-button"
            onClick={form.handleSubmit(onSubmit)}>
            Добавить
          </button>
        </SelectDelete>
      </ModalFormCreate>
    </ModalBackground>
  );
};

export default ModalWindowCreateForm;
