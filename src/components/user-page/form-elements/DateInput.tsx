import { useFormContext } from "react-hook-form";
import DatePickerComponent from "../../../shared/components/date-picker/DatePickerComponent";
import { InputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";

function DateInput(props: {
    inputSettings: InputSettings
}) {
    const formContext = useFormContext()
    const birthDateOnChange = (date: string) => {
        formContext.setValue(props.inputSettings.name, date)
    }
    return (
        <DatePickerComponent
            {...formContext.register(props.inputSettings.name)}
            date={formContext.getValues(props.inputSettings.name)}
            onDateChange={birthDateOnChange} />)
}

export default DateInput;