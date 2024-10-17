import { Button } from "@ui/.";
import { useContext } from "react";
import { PageContext } from "@context/pageContext";
import styles from './Content.module.css';

  
export const Content: React.FC = () => {
  const context = useContext(PageContext);
    
    if (!context) {
        throw new Error('App must be used within a PageProvider');
    }
    
    const { setJournalStarted } = context;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src='/notebook.png' width={'300'} height={'294'} alt='изображение блокнота' />
        <Button iconName='edit' text='Создать первую запись' onClick={() => setJournalStarted(true)} className={styles.button} background={'#FFE55E'} aria-label="Перейти к созданию записи"/>
      </div>
    </main>
  )
};
