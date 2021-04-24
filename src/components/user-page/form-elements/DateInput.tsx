import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { Controller, useFormContext } from 'react-hook-form';
import { ExternalInputSettings } from '../../../shared/helpers/useFormRegisterSettingByKey';
registerLocale("ru", ru);
function DateInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext()
    return (
        <Controller
            control={formContext.control}
            name={props.inputSettings.name}
            render={({ field: { onChange, value, } }) => {
                return (
                    //find or refactor string to date converter
                    <>
                        {(() => {
                            let date: number[] = [];
                            let dateConstructorArg;
                            dateConstructorArg = value ? (value instanceof Date) ? value.toLocaleDateString().split('.') : value.split('.') : [["0", "0"], ["0", "0"], ["0", "0", "0", "0"]];
                            date.push(Number.parseInt(value ? dateConstructorArg[2] : new Date().getFullYear().toString()));
                            date.push(Number.parseInt(value ? dateConstructorArg[1] : new Date().getMonth().toString()));
                            date.push(Number.parseInt(value ? dateConstructorArg[0] : new Date().getDate().toString()));

                            return <DatePicker selected={new Date(date[0], date[1], date[2])} onChange={onChange} locale="ru" />
                        })()
                        }
                    </>)
            }
            } />)
}
export default DateInput;