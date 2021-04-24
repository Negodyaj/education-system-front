import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { Controller, useFormContext } from 'react-hook-form';
import './DatePickerComponent.css';
import { ExternalInputSettings } from '../../../shared/helpers/useFormRegisterSettingByKey';
import { convertStringToDate } from '../../../shared/converters/stringToDateConverter';
registerLocale("ru", ru);
function DateInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext()
    return (
        <Controller
            control={formContext.control}
            name={props.inputSettings.name}
            render={({ field: { onChange, value, } }) => (
                <DatePicker selected={convertStringToDate(value)} onChange={onChange} locale="ru" />
            )} />
    )
}
export default DateInput;