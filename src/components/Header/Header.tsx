import { Button, Logo } from '@ui/.';
import styles from './Header.module.css';
import React, { useContext } from 'react';
import { PageContext } from '@context/pageContext';

export const Header: React.FC = () => {
  const context = useContext(PageContext);
    
    if (!context) {
        throw new Error('App must be used within a PageProvider');
    }
    
    const { journalStarted, setJournalStarted } = context;

  return (
    <header className={styles.header}>
      <button onClick={() => setJournalStarted(false)} className={styles.buttonLogo}><Logo /></button>
      {!journalStarted ? <Button iconName='edit' onClick={() => setJournalStarted(true)} className={styles.button} background={'#FFE55E'} /> : null}
    </header>
  )
}