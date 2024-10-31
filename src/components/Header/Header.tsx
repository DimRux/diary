import { Button, Logo } from '@ui/.';
import React, { useContext } from 'react';
import { PageContext } from '@context/pageContext';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const context = useContext(PageContext);
    
  if (!context) {
    throw new Error('App must be used within a PageProvider');
  }
    
  const { journalStarted, setJournalStarted } = context;

  return (
    <header className={styles.header}>
      <button onClick={() => setJournalStarted(false)} className={styles.buttonLogo} aria-label="Перейти к стартовой странице"><Logo /></button>
      {!journalStarted ? <Button iconName='edit' onClick={() => setJournalStarted(true)} className={styles.button} background='yellow' /> : null}
    </header>
  )
}