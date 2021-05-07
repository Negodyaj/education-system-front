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
  const { date, onDateChange, inputSettings, formContext } = props;
  const [startDate, setStartDate] = useState(date);
  const handleDateChange = (dateArg: Date | [Date, Date] | null) => {
    if (dateArg instanceof Date) {
      setStartDate(dateArg);
      onDateChange && onDateChange(dateArg.toLocaleDateString());
      inputSettings &&
        formContext?.setValue(
          inputSettings.name,
          dateArg.toLocaleDateString()
        );
    }
  };

  return inputSettings ? (
    <Controller
      control={formContext?.control}
      name={inputSettings.name}
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
