import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps {
  date: string | undefined,
  onDateChange: (date: Date) => void
}

function DatePickerComponent(props: DatePickerComponentProps) {
  let date: number[] = [];
  let dateConstructorArg = props.date?.concat().split('.');
  date.push(Number.parseInt(dateConstructorArg ? dateConstructorArg[2] : new Date().getFullYear.toString()));
  date.push(Number.parseInt(dateConstructorArg ? dateConstructorArg[1] : new Date().getMonth.toString()) - 1);
  date.push(Number.parseInt(dateConstructorArg ? dateConstructorArg[0] : new Date().getDay.toString()));
  const [startDate, setStartDate] = useState(new Date(date[0], date[1], date[2]));
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (date instanceof Date) {
      setStartDate(date);
      props.onDateChange(date);
    }
  }
  return (
    <DatePicker selected={startDate} onChange={handleDateChange} />
  );
};

export default DatePickerComponent;