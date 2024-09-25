import React, { useState } from "react"
import styles from './Calendar.module.css'
import { Icon } from "@components/UI";

export const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <label htmlFor="calendar" className={styles.wrapper}>
      <input
        type='date'
        id='calendar'
        value={date.toISOString().split('T')[0]}
        className={styles.inputCalendar}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
      <Icon icon='calendar' className={styles.calendarIcon} />
    </label>
  );
};
