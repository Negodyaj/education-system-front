import { Controller, useFormContext } from 'react-hook-form';

import { ExternalInputSettings } from '../../helpers/userFormRegisterSettingByKey';

import TextInput from './TextInput';

function PictureInput(props: { inputSettings: ExternalInputSettings }) {
  const formContext = useFormContext();
  const { inputSettings } = props;

  return (
    <Controller
      control={formContext.control}
      name={inputSettings.name}
      render={({ field: { onChange, value } }) => (
        <>
          <TextInput inputSettings={inputSettings} onChange={onChange} />
          <img src={value} alt="аватар" />
        </>
      )}
    />
  );
}
export default PictureInput;
