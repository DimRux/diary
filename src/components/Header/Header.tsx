import { Button, Logo } from '@ui/.';
import styles from './Header.module.css';
import React, { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  journalStarted: boolean,
  setJournalStarted: Dispatch<SetStateAction<boolean>>,
}

export const Header: React.FC<HeaderProps> = ({ journalStarted, setJournalStarted }) => {
  return (
    <header className={styles.header}>
      <button onClick={() => setJournalStarted(false)} className={styles.buttonLogo}><Logo /></button>
      {!journalStarted ? <Button iconName='edit' onClick={() => setJournalStarted(true)} className={styles.button} background={'#FFE55E'} /> : null}
    </header>
  )
}