import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.span}>Проект выполнен в рамках стажировки <a href="https://preax.ru/" target="_blank" rel="noopener noreferrer" className={styles.link}>PREAX</a></span>
    </footer>
  );
};
