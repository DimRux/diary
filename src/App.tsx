import { FC, useContext, useEffect } from 'react';
import { Header, Content, Footer, AddNote } from '@components/index';
import { PageContext } from '@context/pageContext';
import { useDispatch } from "react-redux";
import { loadNotes } from '@slices/notesSlice';
import { loadFromLocalStorage } from "@utils/storage";
import styles from './App.module.css';

export const App: FC = () => {
  const context = useContext(PageContext);
  const dispatch = useDispatch();

  if (!context) {
    throw new Error('App must be used within a PageProvider');
  }

  useEffect(() => {
    const storedNotes = loadFromLocalStorage('notes') || [];
    console.log('Store при старте приложения:', storedNotes);
    dispatch(loadNotes(storedNotes));
  }, [dispatch]);

  const { journalStarted } = context;

  return (
    <div className={styles.container}>
      <Header />
      {journalStarted ? <AddNote /> : <Content />}
      <Footer />
    </div>
  );
};
