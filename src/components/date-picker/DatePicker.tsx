import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date: Date | [Date, Date] | null) => {
      if (date instanceof Date)
        setStartDate(date);
    }

    return (
      <DatePicker selected={startDate} onChange={handleDateChange} />
    );
  };

  export default Calendar;