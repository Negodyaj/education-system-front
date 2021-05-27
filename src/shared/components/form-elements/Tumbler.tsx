import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/userFormRegisterSettingByKey';
import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
} from '../../styled-components/consts';

function TumblerInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
}) {
  const formContext = useFormContext();
  const { inputSettings, onChange } = props;

  return !onChange ? (
    <CheckBoxWrapper>
      <CheckBox
        {...formContext.register(
          inputSettings.name,
          inputSettings.registerOptions
        )}
        type="checkbox"
        id="checkbox"
      />
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  ) : null;
}
export default TumblerInput;
