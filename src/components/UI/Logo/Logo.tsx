import { Icon } from "@ui/.";
import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <a href='#' className={styles.logo}>
      <Icon icon="balloon" />
      <h1 className={styles.title}>DreamTime</h1>
    </a>
  );
};
