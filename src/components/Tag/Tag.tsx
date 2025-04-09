import { FC, HTMLAttributes, ReactNode } from 'react';
import { clsx } from '@utils/clsx';
import styles from './Tag.module.css';

export interface ITag extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode,
  className?: string,
  name: string,
}

export const Tag: FC<ITag> = ({ name, children, className }) => {
  return (
      <div className={clsx(styles.tagWrapper, className)}>
        <span className={styles.tagName}>{name}</span>
        {children}
      </div>
  )
}