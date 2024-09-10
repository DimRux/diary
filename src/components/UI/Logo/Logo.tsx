import { Button } from "@ui/.";
import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <a href='#' className={styles.logo}>
      <Button iconName='balloon' className={styles.button} />
      <h1 className={styles.title}>DreamTime</h1>
    </a>
  );
};
