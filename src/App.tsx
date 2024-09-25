import { useContext } from 'react';
import styles from './App.module.css';
import { Header, Content, Footer, AddNote } from '@components/index';
import { PageContext } from '@context/pageContext';

export const App = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error('App must be used within a PageProvider');
  }

  const { journalStarted } = context;

  return (
    <div className={styles.container}>
      <Header />
      {journalStarted ? <AddNote /> : <Content />}
      <Footer />
    </div>
  );
};
