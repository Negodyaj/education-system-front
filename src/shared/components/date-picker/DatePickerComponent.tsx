import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DatePickerComponent.css';

interface DatePickerComponentProps {
  date: string | undefined,
  onDateChange: (date: string) => void
}

function DatePickerComponent(props: DatePickerComponentProps) {
  let date: number[] = [];
  let dateConstructorArg = props.date?.concat().split('.');
  date.push(Number.parseInt(dateConstructorArg ? dateConstructorArg[2] : new Date().getFullYear().toString()));
  date.push(Number.parseInt(dateConstructorArg ? dateConstructorArg[1] : new Date().getMonth().toString()));
  date.push(Number.parseInt(dateConstructorArg ? dateConstructorArg[0] : new Date().getDate().toString()));

  const [startDate, setStartDate] = useState(new Date(date[0], date[1], date[2]));
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setStartDate(date);
      props.onDateChange(date.toLocaleDateString());
    }
  }
  return (
    <DatePicker selected={startDate} onChange={handleDateChange} locale="ru"/>
  );
};

export default DatePickerComponent;