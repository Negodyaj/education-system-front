import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/userFormRegisterSettingByKey';
import { NumberInputStyled } from '../../styled-components/globalStyledConsts';

function NumberInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
  width?: number;
}) {
  const formContext = useFormContext();
  const { inputSettings, width, onChange } = props;

  return !onChange ? (
    <NumberInputStyled
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      type="number"
      width={width}
    />
  ) : (
    <NumberInputStyled
      {...formContext.register(
        inputSettings.name,
        inputSettings.registerOptions
      )}
      onChange={onChange}
      type="number"
      width={width}
    />
  );
}
export default NumberInput;
