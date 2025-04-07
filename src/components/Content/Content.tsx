import { Button } from "@ui/.";
import styles from './Content.module.css';
import { navigateTo } from "@slices/routersSlice";
import { PagePaths } from "@data/pagePaths";
import { useAppDispatch } from "@slices/index";

  
export const Content: React.FC = () => {
  const dispatch = useAppDispatch();

  const addNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(navigateTo(PagePaths.AddNote));
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src='/notebook.png' width={'300'} height={'294'} alt='изображение блокнота' />
        <Button iconName='edit' text='Создать первую запись' onClick={(e) => addNote(e)} className={styles.button} background='yellow' aria-label="Перейти к созданию записи"/>
      </div>
    </main>
  )
};
