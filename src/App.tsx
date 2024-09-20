import { useState } from 'react';
import styles from './App.module.css';
import { Header, Content, Footer, AddNote } from '@components/index';

export const App = () => {
  const [journalStarted, setJournalStarted] = useState(false);

  return (
    <div className={styles.container}>
      <Header journalStarted={journalStarted} setJournalStarted={setJournalStarted} />
      {journalStarted ? <AddNote /> : <Content setJournalStarted={setJournalStarted} />}
      <Footer />
    </div>
  );
};
