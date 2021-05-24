import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputNames } from '../../../enums/inputNames';
import {
  ExternalInputSettings,
  FormElementSettings,
} from '../../helpers/userFormRegisterSettingByKey';

import DateInput from './DateInput';
import MultiSelectInput from './MultiSelectInput';
import NumberInput from './NumberInput';
import PictureInput from './PictureInput';
import SingleSelectInput from './SingleSelectInput';
import TextAreaInput from './TextareaInput';
import TextInput from './TextInput';
import TumblerInput from './Tumbler';

function FormElement(props: { formElementSettings?: FormElementSettings }) {
  const { formElementSettings } = props;
  const formContext = useFormContext();

  if (!formElementSettings) return <>error in FormElement</>;

  const { inputType } = formElementSettings.inputSettings;
  const inputSettings = { ...formElementSettings.inputSettings };
  console.log(inputSettings);

  return (
    <div className="form-row">
      <label htmlFor="#" className="form-label">
        {formElementSettings.label}
      </label>
      {inputType === 'text' && (
        <TextInput
          width={formElementSettings.width}
          inputSettings={inputSettings}
        />
      )}
      {inputType === 'textarea' && (
        <TextAreaInput
          width={formElementSettings.width}
          inputSettings={inputSettings}
        />
      )}
      {inputType === 'number' && (
        <NumberInput
          width={formElementSettings.width}
          inputSettings={inputSettings}
        />
      )}
      {inputType === 'date' && (
        <DateInput inputSettings={inputSettings as ExternalInputSettings} />
      )}
      {inputType === 'multiSelect' && (
        <MultiSelectInput
          inputSettings={inputSettings as ExternalInputSettings}
        />
      )}
      {inputType === 'singleSelect' && (
        <SingleSelectInput
          inputSettings={inputSettings as ExternalInputSettings}
        />
      )}
      {inputType === 'picture' && (
        <PictureInput inputSettings={inputSettings as ExternalInputSettings} />
      )}
      {inputType === 'tumbler' && (
        <TumblerInput inputSettings={inputSettings} />
      )}
      <ErrorMessage
        errors={formContext.formState.errors}
        name={inputSettings.name}
        className="bad-feedback"
        as="div"
      />
    </div>
  );
}
export default FormElement;
