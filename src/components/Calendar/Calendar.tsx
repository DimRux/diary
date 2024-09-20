import React from "react"
import styles from './Calendar.module.css'
import { Icon } from "@components/UI";

export const Calendar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <input
        type='date'
        value="2023-11-14"
        className={styles.inputCalendar}
      />
      <Icon icon='calendar' className={styles.calendarIcon} />
    </div>
  );
};
