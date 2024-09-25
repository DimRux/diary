import React, { useState } from "react"
import styles from './Selector.module.css'
import { Icon } from "@components/UI";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { clsx } from "@utils/clsx";
import { arrEmoji } from "@data/arrEmoji";

export const Selector: React.FC = () => {
  const [emoji, setEmoji] = useState(18);
  const [isOpenEmojis, setIsOpenEmojis] = useState(false);
  const ref = useOutsideClick<HTMLButtonElement>(() => setIsOpenEmojis(false));

  return (
    <div className={styles.selector}>
      <button type="button" ref={ref} className={clsx(styles.buttonEmoji, isOpenEmojis && styles.buttonEmojiActive)} onClick={() => setIsOpenEmojis(prevState => !prevState)}>
        {emoji === 18 ? <Icon icon='emoji' className={styles.emoji} /> : arrEmoji[emoji]}
        <Icon icon="chevron" className={isOpenEmojis ? styles.chevron : ''} />
      </button>
      {isOpenEmojis && (
        <div className={styles.container}>
          <ul className={styles.emojiContainer}>
            {arrEmoji.map((element, index) =>
              <li key={index} ><button onClick={() => setEmoji(index)} className={clsx(styles.emojiButton, emoji === index && styles.activeEmoji)}>
                {element}
              </button></li>)}
            <li>
              <button type="button" onClick={() => setEmoji(18)} className={styles.buttonBackEmoji}>
                <Icon icon='clean' />
                <span>Убрать эмоцию</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}