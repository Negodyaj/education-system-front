import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponent.css';
import ru from 'date-fns/locale/ru';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

import { ExternalInputSettings } from '../../helpers/useFormRegisterSettingByKey';
import { convertStringToDate } from '../../converters/stringToDateConverter';
registerLocale('ru', ru);

interface DatePickerComponentProps {
  date?: Date;
  onDateChange?: (date: string) => void;
  inputSettings?: ExternalInputSettings;
  formContext?: UseFormReturn<FieldValues>;
}
function DatePickerComponent(props: DatePickerComponentProps) {
  const [startDate, setStartDate] = useState(props.date);
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setStartDate(date);
      props.onDateChange && props.onDateChange(date.toLocaleDateString());
      props.inputSettings &&
        props.formContext?.setValue(
          props.inputSettings.name,
          date.toLocaleDateString()
        );
    }
  };

  return props.inputSettings ? (
    <Controller
      control={props.formContext?.control}
      name={props.inputSettings.name}
      render={({ field: { value } }) => (
        <DatePicker
          selected={convertStringToDate(value)}
          onChange={handleDateChange}
          locale="ru"
        />
      )}
    />
  ) : (
    <DatePicker selected={startDate} onChange={handleDateChange} locale="ru" />
  );
}

export default DatePickerComponent;
