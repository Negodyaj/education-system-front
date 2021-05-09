import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormProvider, UseFormReturn } from "react-hook-form";
import {
  ButtonClose,
  FormWrapper,
  HeadModal,
  ModalFormCreate,
  ModalBackground,
  SelectDelete,
  ModalHeader,
  InputStyle
} from "./ModalWindowCreateFormStyled";
import { InputNames } from "../../../enums/inputNames";
import { CourseInput } from "../../../interfaces/CourseInput";
import { UserInput } from "../../../interfaces/UserInput";
import { FormElementSettings } from "../../helpers/useFormRegisterSettingByKey";
import FormElement from "../form-elements/FormElement";
import React from "react";

interface CreateModalProps {
  headerName: string
  objectKeysOnForm: CourseInput | UserInput | any
  form: UseFormReturn<any>
  closeHandler: () => void
  createFormElementOnType: (key: InputNames) => FormElementSettings
  onSubmit: (data: any) => void
}

const ModalWindowCreateForm = (props: CreateModalProps) => {
  const {
    headerName,
    objectKeysOnForm,
    closeHandler,
    createFormElementOnType,
    onSubmit,
    form
  } = props;

  return (
    <ModalBackground>
      <ModalFormCreate>
          <ModalHeader>
              <HeadModal><h4>{headerName}</h4></HeadModal>
              <ButtonClose onClick={closeHandler}>
                  <FontAwesomeIcon icon='times'/>
              </ButtonClose>
          </ModalHeader>
        <FormProvider { ...form } >
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <InputStyle>
              {
                Object.keys(objectKeysOnForm).map(key => {
                return <FormElement key={key} formElementSettings={createFormElementOnType(key as InputNames)}></FormElement>
                })
              }
            </InputStyle>
          </FormWrapper>
        </FormProvider>
        <SelectDelete>
            <button className="common-button" onClick={closeHandler}>Отменить</button>
            <button className="common-button" onClick={form.handleSubmit(onSubmit)}>Добавить</button>
        </SelectDelete>
      </ModalFormCreate>
    </ModalBackground>
  )
}

export default ModalWindowCreateForm;