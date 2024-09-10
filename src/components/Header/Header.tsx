import { Button, Logo } from '@ui/.';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Button iconName='edit' className={styles.button} />
    </header>
  )
}