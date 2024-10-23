import { FC, Dispatch, SetStateAction, useState } from 'react';
import { Icon } from '@ui/.';
import { clsx } from '@utils/.';
import Theme from '@assets/images/theme.png';
import styles from './ImagesList.module.css';

interface ImagesListProps {
  images: string[];
  setActiveTheme: Dispatch<SetStateAction<string>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

export const ImagesList: FC<ImagesListProps> = ({ images, setActiveTheme, setShowModal }) => {
  const [theme, setTheme] = useState('');
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  const onClickButton = (themePath: string) => {
    if (theme === themePath) {
      setIsThemeChanging(false);
      setTheme('');
      setActiveTheme(Theme);
    } else {
      setTheme(themePath);
      setIsThemeChanging(true);
      
      setTimeout(() => {
        setShowModal(false);
        setActiveTheme(themePath);
      }, 200);
    }
  };

  return (
    <div className={styles.wrapper}>
      {images.map((imgPath) => (
        <button 
          className={clsx(styles.button, theme === imgPath ? styles.activeButton : null)} 
          key={imgPath}
          onClick={() => onClickButton(imgPath)}
          disabled={isThemeChanging && theme !== imgPath}
        >
          <img src={imgPath} className={styles.img} />
          {theme === imgPath ? <Icon icon='image' className={styles.icon} /> : null}
        </button>
      ))}
    </div>
  );
};