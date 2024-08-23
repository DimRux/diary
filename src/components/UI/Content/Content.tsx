import { Button } from "../Button/Button";
import styles from './Content.module.css';

export const Content = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src='/notebook.png' alt='изображение блокнота' />
        <Button iconName='edit' text='Создать первую запись' className={styles.button} />
      </div>
    </main>
  )
}