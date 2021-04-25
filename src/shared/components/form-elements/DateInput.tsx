import "react-datepicker/dist/react-datepicker.css";
import { useFormContext } from 'react-hook-form';
import { ExternalInputSettings } from '../../helpers/useFormRegisterSettingByKey';
import DatePickerComponent from '../date-picker/DatePickerComponent';
function DateInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext()
    return (
        <DatePickerComponent
            inputSettings={props.inputSettings}
            formContext={formContext}></DatePickerComponent>
    )
}
export default DateInput;