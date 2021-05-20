import { useFormContext } from 'react-hook-form';

import { ExternalInputSettings } from '../../helpers/userFormRegisterSettingByKey';
import CustomMultiSelect from '../multi-select/CustomMultiSelect';

function SingleSelectInput(props: { inputSettings: ExternalInputSettings }) {
  const formContext = useFormContext();
  const { inputSettings } = props;

  return (
    <CustomMultiSelect
      selectType="single"
      inputSettings={inputSettings}
      formContext={formContext}
    />
  );
}
export default SingleSelectInput;
