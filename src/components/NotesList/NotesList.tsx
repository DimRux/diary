import { NotesItem } from "@components/NotesItem/NoteItem";
import { useAppSelector } from "@slices/index";
import styles from './NotesList.module.css';

export const NotesList = () => {
  const { notes } = useAppSelector(state => state.notes);

  if (notes.length === 0) {
    return (
      <main className={styles.main}>
        <p>Нет созданных заметок</p>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <ul className={styles.container}>
        {[...notes].reverse().map(({ id, date, emoji, image, tags, text, title }) => <NotesItem key={id} id={id} date={date} emoji={emoji} image={image} tags={tags} text={text} title={title} />)}
      </ul>
    </main>
  )
}