import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';

import { ExternalInputSettings } from '../../helpers/userFormRegisterSettingByKey';
import DatePickerComponent from '../date-picker/DatePickerComponent';
function DateInput(props: { inputSettings: ExternalInputSettings }) {
  const formContext = useFormContext();
  const { inputSettings } = props;

  return (
    <DatePickerComponent
      inputSettings={inputSettings}
      formContext={formContext}
    />
  );
}
export default DateInput;
