import { Note } from "@components/Note/Note";
import { useAppSelector } from "@slices/index"

export const Notes = () => {
  const { notes } = useAppSelector(state => state.notes);

  if (notes.length === 0) {
    return (
      <div>
        <p>Нет созданных заметок</p>
      </div>
    )
  }

  return (
    <section>
      <ul>
        {notes.map(({ id, date, emoji, image, tags, text, title }) => <Note key={id} id={id} date={date} emoji={emoji} image={image} tags={tags} text={text} title={title} />)}
      </ul>
    </section>
  )
}