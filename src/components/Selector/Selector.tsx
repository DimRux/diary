import React, { useState } from "react"
import styles from './Selector.module.css'
import { Icon } from "@components/UI";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { clsx } from "@utils/clsx";

export const Selector: React.FC = () => {
  const arrEmoji = ['😌', '😊', '😄', '🤣', '😰', '🥰', '🙃', '😔', '😇', '🤔', '😩', '😭', '😤', '😵', '🤒', '🤤', '😅', '😛'];
  
  const [emoji, setEmoji] = useState(18);
  const [isOpenEmojis, setIsOpenEmojis] = useState(false);
  const ref = useOutsideClick<HTMLButtonElement>(() => setIsOpenEmojis(false));
  return (
    <div className={styles.selector}>
      <button ref={ref} className={clsx(styles.buttonEmoji, isOpenEmojis && styles.buttonEmojiActive)} onClick={() => setIsOpenEmojis(prevState => !prevState)}>
        {emoji === 18 ? <Icon icon='emoji' className={styles.emoji} /> : arrEmoji[emoji]}
        <Icon icon="chevron" className={isOpenEmojis ? styles.chevron : ''} />
      </button>
      {isOpenEmojis && (
        <div className={styles.container}>
          <div className={styles.emojiContainer}>
            {arrEmoji.map((element, index) =>
              <button onClick={() => setEmoji(index)} key={index} className={clsx(styles.emojiButton, emoji === index && styles.activeEmoji)}>
                {element}
              </button>)}
            <button onClick={() => setEmoji(18)} className={styles.buttonBackEmoji}>
              <Icon icon='clean' />
              <span>Убрать эмоцию</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}