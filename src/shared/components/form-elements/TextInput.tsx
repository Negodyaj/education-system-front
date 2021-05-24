import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/userFormRegisterSettingByKey';
import { InputText } from '../../styled-components/globalStyledConsts';

function TextInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
  width?: number;
}) {
  const formContext = useFormContext();
  const { inputSettings, width, onChange } = props;

  return !onChange ? (
    <InputText
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      type="text"
      className="form-input"
      width={width}
    />
  ) : (
    <InputText
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      onChange={onChange}
      type="text"
      className="form-input"
      width={width}
    />
  );
}
export default TextInput;
