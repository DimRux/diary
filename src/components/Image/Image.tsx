import React from "react"
import Theme from '@assets/images/theme.png'
import styles from './Image.module.css';

interface ImgProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Image: React.FC<ImgProps> = ({ ...props }) => {
  return (
    <button type="button" className={styles.button} {...props}>
      <img src={Theme} width={380} height={240} className={styles.img} alt='тема'  />
    </button>
  )
}