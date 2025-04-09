import { FC, useState, useEffect, ChangeEvent } from "react";
import { Textarea, Input, Button } from "@ui/."
import { Selector, Image, Calendar, TagSelector, Tag } from "@components/.";
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorageKeys } from "@utils/storage";
import { arrEmoji } from "@data/arrEmoji";
import { addNote, INote, NotesState, updateNote } from "@slices/notesSlice";
import Theme from '@assets/images/theme.png';
import styles from './addNote.module.css';
import { useAppDispatch, useAppSelector } from "@slices/index";
import { navigateTo } from "@slices/routersSlice";
import { PagePaths } from "@data/pagePaths";
import { uniqId } from "@utils/uniqId";

export const AddNote: FC = () => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector(state => state.notes)
  const idPath = window.location.pathname.split(':')[1] || '';

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

    if (idPath) {
      const currentNote = notes.find((note) => note.id === `id_${idPath}`) as INote;
      setTitle(currentNote.title);
      setContent(currentNote.text);
      setEmoji(arrEmoji.findIndex((element) => currentNote.emoji === element));
      setActiveTheme(currentNote.image);
      setActiveTags(currentNote.tags);
      setDate(currentNote.date);
    } else {
      
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
      id: uniqId(),
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
    dispatch(navigateTo(PagePaths.Notes));

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

  const updateNoteById = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentNote = notes.find((note) => note.id === `id_${idPath}`) as INote;
    const note = {
      ...currentNote,
      title: title,
      date: date,
      emoji: emoji !== -1 ? arrEmoji[emoji] : '',
      text: content,
      tags: activeTags,
      image: activeTheme === Theme ? '' : activeTheme,
    } as INote;

    console.log('Обновленная заметка:',note);

    dispatch(updateNote({ id: note.id, note}));
    const resultNotes = loadFromLocalStorage('notes') || [];
    const index = resultNotes.findIndex((existingNote: INote) => existingNote.id === note.id);

    if (index !== -1) {
      resultNotes[index] = note;
    }
    saveToLocalStorage<NotesState>('notes', resultNotes);

    dispatch(navigateTo(PagePaths.Notes));

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

  const back = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (idPath) {
      dispatch(navigateTo(PagePaths.Notes));
    } else {
      dispatch(navigateTo(PagePaths.Home));
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={idPath ? updateNoteById : createNote}>
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
            text={idPath ? 'Изменить запись' : 'Создать запись'}
            className={styles.create}
            background='yellow'
            disabled={title === '' || date === ''}
          />
          <Button
            type="button" 
            text='Отменить' 
            className={styles.reset} 
            background='grey' 
            onClick={(e) => back(e)}
            />
        </div>
      </form>
    </main>
  )
};
