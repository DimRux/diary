import { FC, useState, useEffect } from "react"
import { Icon } from "@components/UI";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { clsx } from "@utils/clsx";
import { arrEmoji } from "@data/arrEmoji";
import { saveToLocalStorage, loadFromLocalStorage } from "@utils/storage";
import styles from './Selector.module.css'

export const Selector: FC = () => {
  const [emoji, setEmoji] = useState(-1);
  const [isOpenEmojis, setIsOpenEmojis] = useState(false);
  const ref = useOutsideClick<HTMLButtonElement>(() => setIsOpenEmojis(false));

  useEffect(() => {
    const emojiNumber = loadFromLocalStorage('emoji');
    if (emojiNumber) {
      setEmoji(loadFromLocalStorage('emoji'));
    }
  },[]);

  return (
    <div className={styles.selector}>
      <button type="button" ref={ref} className={clsx(styles.buttonEmoji, isOpenEmojis && styles.buttonEmojiActive)} onClick={() => setIsOpenEmojis(prevState => !prevState)} aria-label="Перейти к выбору эмодзи статуса">
        {emoji === -1 ? <Icon icon='emoji' className={styles.emoji} /> : arrEmoji[emoji]}
        <Icon icon="chevron" className={isOpenEmojis ? styles.chevron : ''} />
      </button>
      {isOpenEmojis && (
        <div className={styles.container}>
          <ul className={styles.emojiContainer}>
            {arrEmoji.map((element, index) =>
              <li key={index}>
                <button
                aria-label="Выбрать эмодзи статус"
                onClick={() => {
                  saveToLocalStorage<number>('emoji', index);
                  setEmoji(index);
                }}
                className={clsx(styles.emojiButton, emoji === index && styles.activeEmoji)}
                >
                  {element}
                </button>
              </li>)}
          </ul>
          <button 
            type="button" 
            aria-label="Вернуть стандартный эмодзи статус"
            onClick={() => {
              saveToLocalStorage<number>('emoji', -1);
              setEmoji(-1);
            }} 
            className={styles.buttonBackEmoji}
            >
              <Icon icon='clean' className={clsx(emoji === -1 && styles.icon)} />
              <span className={clsx(emoji === -1 && styles.span)} >Убрать эмоцию</span>
          </button>
        </div>
      )}
    </div>
  )
}