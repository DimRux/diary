import { Button, Logo } from '@ui/.';
import { FC } from 'react';

import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '@slices/index';
import { navigateTo } from '@slices/routersSlice';
import { PagePaths } from '@data/pagePaths';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { path } = useAppSelector((state) => state.routersSlice);

  const addNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(navigateTo(PagePaths.AddNote));
  }

  const getHome = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(navigateTo(PagePaths.Home));
  }

  return (
    <header className={styles.header}>
      <button onClick={(e) => getHome(e)} className={styles.buttonLogo} aria-label="Перейти к стартовой странице"><Logo /></button>
      {path !== PagePaths.AddNote && <Button iconName='edit' onClick={(e) => addNote(e)} className={styles.button} background='yellow' />}
    </header>
  )
}