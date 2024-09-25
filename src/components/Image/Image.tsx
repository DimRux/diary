import React, { ImgHTMLAttributes } from "react"
import Theme from '@assets/images/theme.png'
import styles from './Image.module.css';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image: React.FC<ImgProps> = ({ ...props }) => {
  return <img src={Theme} alt='тема' className={styles.img} {...props}/>
}