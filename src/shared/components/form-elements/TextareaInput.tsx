import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/useFormRegisterSettingByKey';

function TextAreaInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
}) {
  const formContext = useFormContext();

  return !props.onChange ? (
    <textarea
      {...formContext.register(
        props.inputSettings.name,
        props.inputSettings.registerOptions
      )}
      typeof="text"
      className="form-input-textarea"
    />
  ) : (
    <textarea
      {...formContext.register(
        props.inputSettings.name,
        props.inputSettings.registerOptions
      )}
      onChange={props.onChange}
      typeof="text"
      className="form-input-textarea"
    />
  );
}
export default TextAreaInput;
