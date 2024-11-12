import { FC, Dispatch, SetStateAction } from "react"
import { Icon } from "@components/UI";
import { saveToLocalStorage } from "@utils/storage";
import styles from './Calendar.module.css'

interface CalendarProps {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export const Calendar: FC<CalendarProps> = ({ date, setDate }) => {

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
