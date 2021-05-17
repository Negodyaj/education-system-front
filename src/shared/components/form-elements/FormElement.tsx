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

function FormElement(props: { formElementSettings: FormElementSettings }) {
  const formContext = useFormContext();
  const { formElementSettings } = props;
  const { inputType } = formElementSettings.inputSettings;
  const inputSettings = { ...formElementSettings.inputSettings };

  return (
    <div className="form-row">
      <label htmlFor="#" className="form-label">
        {formElementSettings.label}
      </label>
      {inputType === 'text' && <TextInput inputSettings={inputSettings} />}
      {inputType === 'textarea' && (
        <TextAreaInput inputSettings={inputSettings} />
      )}
      {inputType === 'number' && <NumberInput inputSettings={inputSettings} />}
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
