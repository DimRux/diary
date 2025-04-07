import { Icon } from '@ui/.';
import { clsx } from '@utils/clsx';
import { colors } from '@data/colors';
import styles from './Button.module.css';

type IconName = 'balloon' | 'edit';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: IconName;
  text?: string;
  className?: string;
  background?: keyof typeof colors | 'transparent';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ iconName, text, className, background = 'transparent', ...props }) => {

  return (
    <button className={clsx(className, styles.button, styles[`button-${background}`])} {...props}>
      {iconName && <Icon className={styles.icon} icon={iconName} />}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};
