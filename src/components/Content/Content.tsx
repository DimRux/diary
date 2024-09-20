import { Button } from "@ui/.";
import styles from './Content.module.css';
import { Dispatch, SetStateAction } from 'react';

interface ContentProps {
  setJournalStarted: Dispatch<SetStateAction<boolean>>;
}

  
export const Content: React.FC<ContentProps> = ({ setJournalStarted }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src='/notebook.png' width={'300'} height={'294'} alt='изображение блокнота' />
        <Button iconName='edit' text='Создать первую запись' onClick={() => setJournalStarted(true)} className={styles.button} background={'#FFE55E'} />
      </div>
    </main>
  )
};
