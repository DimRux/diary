import { FC, useState, useEffect, ChangeEvent } from "react";
import { Textarea, Input, Button } from "@ui/."
import { Selector, Image, Calendar, TagSelector, Tag } from "@components/.";
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorageKeys } from "@utils/storage";
import { arrEmoji } from "@data/arrEmoji";
import { useDispatch } from 'react-redux'
import { addNote, NotesState } from "@slices/notesSlice";
import Theme from '@assets/images/theme.png';
import styles from './addNote.module.css';

export const AddNote: FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emoji, setEmoji] = useState(-1);
  const [activeTheme, setActiveTheme] = useState(Theme);
  const [activeTags, setActiveTags] = useState<Tag[] | []>([]);
  const [date, setDate] = useState(new Date(Date.now())
    .toLocaleDateString('zh-Hans-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')
  );

  useEffect(() => {
    const storedTitleValue = loadFromLocalStorage('inputTitle');
    if (storedTitleValue) {
      setTitle(storedTitleValue);
    }
  
    const storedTextarea = loadFromLocalStorage('textarea');
    if (storedTextarea) {
      setContent(storedTextarea);
    }

    const storedActiveTheme = loadFromLocalStorage('activeTheme');
    if (storedActiveTheme) {
      setActiveTheme(storedActiveTheme);
    }

    const storedDateValue = loadFromLocalStorage('date');
    if (storedDateValue) {
      setDate(storedDateValue);
    }

    const emojiNumber = loadFromLocalStorage('emoji');
    if (emojiNumber) {
      setEmoji(loadFromLocalStorage('emoji'));
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

  const createNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const note = {
      title: title,
      date: date,
      emoji: emoji !== -1 ? arrEmoji[emoji] : '',
      text: content,
      tags: activeTags,
      image: activeTheme === Theme ? '' : activeTheme,
    };

    console.log('Созданная заметка:',note);

    dispatch(addNote(note));
    const resultNote = loadFromLocalStorage('notes') || [];
    resultNote.push(note);
    saveToLocalStorage<NotesState>('notes', resultNote);

    setTitle('');
    setContent('');
    setEmoji(-1);
    setActiveTags([]);
    setDate(new Date(Date.now())
    .toLocaleDateString('zh-Hans-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-'));
    setActiveTheme(Theme);
    clearLocalStorageKeys();
  }

  return (
    <main className={styles.main}>
      <form onSubmit={createNote}>
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
              <Calendar date={date} setDate={setDate} />
              <Selector emoji={emoji} setEmoji={setEmoji} />
            </div>
            <div className={styles.imgWrapper}>
              <Image activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
            </div>
            <TagSelector activeTags={activeTags} setActiveTags={setActiveTags} />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            type="submit"
            iconName='edit'
            text='Создать запись'
            className={styles.create}
            background='yellow'
            disabled={title === '' || content === '' || date === ''}
          />
          <Button type="button" text='Отменить' className={styles.reset} background='grey' />
        </div>
      </form>
    </main>
  )
};
