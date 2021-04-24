import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DatePickerComponent.css';
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

interface DatePickerComponentProps {
  date: Date,
  onDateChange: (date: string) => void
}

function DatePickerComponent(props: DatePickerComponentProps) {

  const [startDate, setStartDate] = useState(props.date);
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setStartDate(date);
      props.onDateChange(date.toLocaleDateString());
    }
  }
  return (
    <DatePicker selected={startDate} onChange={handleDateChange} locale="ru" />
  );
};

export default DatePickerComponent;