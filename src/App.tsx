import { FC, useEffect } from 'react';
import { Header, Footer} from '@components/index';
import { loadNotes } from '@slices/notesSlice';
import { loadFromLocalStorage } from "@utils/storage";
import styles from './App.module.css';
import { useAppDispatch } from './store';
import { Router } from './app/Router/Router';
import { MOCK_NOTES } from '@data/mockNotes';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedNotes = loadFromLocalStorage('notes') || MOCK_NOTES;
    console.log('Store при старте приложения:', storedNotes);
    dispatch(loadNotes(storedNotes));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header />
      <Router />
      <Footer />
    </div>
  );
};
