import { Button } from "../Button/Button";
import { Logo } from "../Logo/Logo";
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Button iconName='edit' className={styles.button} />
    </header>
  )
}