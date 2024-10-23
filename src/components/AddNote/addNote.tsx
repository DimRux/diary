import { FC, useState, useEffect, ChangeEvent } from "react";
import { Textarea, Input, Button } from "@ui/."
import { Selector, Image, Calendar, TagSelector } from "@components/.";
import { saveToLocalStorage, loadFromLocalStorage } from "@utils/storage";
import styles from './addNote.module.css';

export const AddNote: FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const storedTitleValue = loadFromLocalStorage('inputTitle');
    if (storedTitleValue) {
      setTitle(storedTitleValue);
    }
  
    const storedTextarea = loadFromLocalStorage('textarea');
    if (storedTextarea) {
      setContent(storedTextarea);
    }
  }, []);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    saveToLocalStorage<string>('inputTitle', e.target.value);
  }

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    saveToLocalStorage<string>('textarea', e.target.value);
  }

  return (
    <main className={styles.main}>
      <form>
        <div className={styles.block}>
          <div className={styles.content}>
            <Input
              placeholder="Заголовок"
              className={styles.inputHeader}
              value={title}
              onChange={handleChangeTitle}
            />
            <Textarea 
              className={styles.textarea} 
              value={content}
              onChange={handleChangeContent}
            />
          </div>
          <div className={styles.settings}>
            <div className={styles.wrapper}>
              <Calendar />
              <Selector />
            </div>
            <div className={styles.imgWrapper}>
              <Image />
            </div>
            <TagSelector />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button type="submit" iconName='edit' text='Создать запись' className={styles.create} background={'#FFE55E'} />
          <Button type="button" text='Отменить' className={styles.reset} background={'#E9EAEA'} />
        </div>
      </form>
    </main>
  )
};
