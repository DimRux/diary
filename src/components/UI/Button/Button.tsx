import Icon from "../Icon/Icon";
import styles from './Button.module.css';

type IconName = 'balloon' | 'edit';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  iconName: IconName;
  text?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ iconName, text, className }) => {
  return (
    <button className={className}>
      <Icon icon={iconName} />
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};
