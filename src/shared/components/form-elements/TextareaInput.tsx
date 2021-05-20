import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/useFormRegisterSettingByKey';
import { TextareaStyled } from '../../styled-components/globalStyledConsts';

function TextAreaInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
  width?: number;
}) {
  const formContext = useFormContext();
  const { inputSettings, onChange, width } = props;

  return !onChange ? (
    <TextareaStyled
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      typeof="text"
      width={width}
    />
  ) : (
    <TextareaStyled
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      onChange={onChange}
      typeof="text"
      width={width}
    />
  );
}
export default TextAreaInput;
