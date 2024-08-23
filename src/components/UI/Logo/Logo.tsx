import { Button } from "../Button/Button";
import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <a href='#' className={styles.logo}>
      <Button iconName='balloon' className={styles.button} />
      <h2 className={styles.title}>DreamTime</h2>
    </a>
  );
};
