import { Icon } from '@ui/.';
import { clsx } from '@utils/clsx';
import styles from './Button.module.css';

type IconName = 'balloon' | 'edit';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: IconName;
  text?: string;
  className?: string;
  background?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ iconName, text, className, background, ...props }) => {

  const buttonStyle = {
    backgroundColor: background || 'transparent',
  };

  return (
    <button className={clsx(className, styles.button)} style={buttonStyle} {...props}>
      {iconName && <Icon icon={iconName} />}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};
