import { FC, useState, useEffect } from "react"
import { Icon } from "@components/UI";
import { saveToLocalStorage, loadFromLocalStorage } from "@utils/storage";
import styles from './Calendar.module.css'

export const Calendar: FC = () => {
  const [date, setDate] = useState(new Date(Date.now())
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')
  );

  useEffect(() => {
    setDate(loadFromLocalStorage('date'));
  }, []);

  return (
    <label htmlFor="calendar" className={styles.wrapper}>
      <input
        type='date'
        id='calendar'
        value={date}
        className={styles.inputCalendar}
        aria-label='Изменить дату в календаре'
        onChange={(e) => {
          saveToLocalStorage<string>('date', e.target.value);
          setDate(e.target.value);
        }}
      />
      <Icon icon='calendar' className={styles.calendarIcon} />
    </label>
  );
};
