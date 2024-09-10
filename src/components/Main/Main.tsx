import { Button } from "@ui/.";
import styles from './Main.module.css';

export const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src='/notebook.png' width={'300'} height={'294'} alt='изображение блокнота' />
        <Button iconName='edit' text='Создать первую запись' className={styles.button} />
      </div>
    </main>
  )
};
