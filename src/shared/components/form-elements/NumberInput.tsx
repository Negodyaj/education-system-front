import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/useFormRegisterSettingByKey';
import { NumberInputStyled } from '../../styled-components/globalStyledConsts';

function NumberInput(props: {
  inputSettings: InputSettings;
  onChange?: (...event: any[]) => void;
  width?: number;
}) {
  const formContext = useFormContext();

  return !props.onChange ? (
    <NumberInputStyled
      {...formContext.register(
        props.inputSettings.name,
        props.inputSettings.registerOptions
      )}
      type="number"
      width={props.width}
    />
  ) : (
    <NumberInputStyled
      {...formContext.register(
        props.inputSettings.name,
        props.inputSettings.registerOptions
      )}
      onChange={props.onChange}
      type="number"
      width={props.width}
    />
  );
}
export default NumberInput;
