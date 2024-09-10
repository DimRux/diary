import styles from './App.module.css';
import { Header, Content, Footer } from '@components/index';

export const App = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
