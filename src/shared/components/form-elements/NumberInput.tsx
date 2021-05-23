import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/userFormRegisterSettingByKey';

function NumberInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
}) {
  const formContext = useFormContext();
  const { onChange, inputSettings } = props;

  return !onChange ? (
    <input
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      type="number"
      className="form-input"
    />
  ) : (
    <input
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      onChange={onChange}
      type="number"
      className="form-input"
    />
  );
}
export default NumberInput;
