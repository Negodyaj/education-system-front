import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/userFormRegisterSettingByKey';

function TextAreaInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
}) {
  const { inputSettings, onChange } = props;
  const formContext = useFormContext();

  return !onChange ? (
    <textarea
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      typeof="text"
      className="form-input-textarea"
    />
  ) : (
    <textarea
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      onChange={onChange}
      typeof="text"
      className="form-input-textarea"
    />
  );
}
export default TextAreaInput;
