import { PagePaths } from "@data/pagePaths";
import { useAppDispatch } from "@slices/index";
import { INote } from "@slices/notesSlice";
import { navigateTo } from "@slices/routersSlice";
import { FC } from "react";

export const Note: FC<INote> = ({ id, title, text, date, emoji, image, tags }) => {
  const dispatch = useAppDispatch();

  const openNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(navigateTo(`${PagePaths.AddNote}/:${id.slice(3)}`));
  }

  return (
    <li>
      <button onClick={(e) => openNote(e)}>
        <div>
          <span>{date}</span>
          <span>{emoji}</span>
        </div>
        <img src={image} />
        <h4>{title}</h4>
        <p>{tags.map(({ id, name }) => <span key={id}>{name}</span>)}</p>
        <p>{text}</p>
      </button>
    </li>
  )
}