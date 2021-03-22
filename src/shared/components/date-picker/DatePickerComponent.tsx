import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps{
  date: Date | null,
  onDateChange: (date: Date)=>void
}

function DatePickerComponent(props:DatePickerComponentProps) {
  const [startDate, setStartDate] = useState(props.date);
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