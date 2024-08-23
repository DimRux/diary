import styles from './App.module.css';
import { Content } from './components/UI/Content/Content';
import { Footer } from './components/UI/Footer/Footer';
import { Header } from './components/UI/Header/Header';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App
