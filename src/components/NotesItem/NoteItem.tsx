import { PagePaths } from "@data/pagePaths";
import { useAppDispatch } from "@slices/index";
import { INote } from "@slices/notesSlice";
import { navigateTo } from "@slices/routersSlice";
import { FC } from "react";
import Theme from '@assets/images/theme.png';
import { MONTHS } from "@data/months";
import { TagList } from "@components/TagList/TagList";
import styles from './NotesItem.module.css';

export const NotesItem: FC<INote> = ({ id, title, text, date, emoji, image, tags }) => {
  const dispatch = useAppDispatch();

  const openNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(navigateTo(`${PagePaths.AddNote}/:${id.slice(3)}`));
  }

  const currentDate = new Date(date);

  return (
    <li className={styles.wrapper}>
      <button className={styles.item} onClick={(e) => openNote(e)}>
        <div className={styles.headerItem}>
          <p className={styles.date}>
            <span className={styles.dateNumber}>{currentDate.getDate()}</span>
            <span className={styles.dateMonth}>{MONTHS[currentDate.getMonth()]}</span>
          </p>
          {emoji && <span className={styles.emoji}>{emoji}</span>}
        </div>
        <img className={styles.image} src={image ? image : Theme} />
        <div className={styles.contentItem}>
          <h4 className={styles.title}>{title}</h4>
          {tags.length > 0 && <TagList tags={tags} />}
          {tags.length === 0 && <p className={styles.text}>{text}</p>}
        </div>
      </button>
    </li>
  )
}