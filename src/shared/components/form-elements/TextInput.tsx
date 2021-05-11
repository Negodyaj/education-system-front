import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/useFormRegisterSettingByKey';

function TextInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
}) {
  const { inputSettings, onChange } = props;
  const formContext = useFormContext();

  return !onChange ? (
    <input
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      type="text"
      className="form-input"
    />
  ) : (
    <input
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      onChange={onChange}
      type="text"
      className="form-input"
    />
  );
}
export default TextInput;
