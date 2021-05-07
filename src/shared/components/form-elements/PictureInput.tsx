import { Controller, useFormContext } from 'react-hook-form';

import { ExternalInputSettings } from '../../helpers/useFormRegisterSettingByKey';

import TextInput from './TextInput';

function PictureInput(props: { inputSettings: ExternalInputSettings }) {
  const formContext = useFormContext();

  return (
    <Controller
      control={formContext.control}
      name={props.inputSettings.name}
      render={({ field: { onChange, value } }) => (
        <>
          <TextInput inputSettings={props.inputSettings} onChange={onChange} />
          <img src={value} alt="аватар" />
        </>
      )}
    />
  );
}
export default PictureInput;
