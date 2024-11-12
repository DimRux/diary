import { FC, Dispatch, SetStateAction, useState } from 'react';
import { Icon } from '@ui/.';
import { clsx } from '@utils/.';
import { ImageItem } from '@components/Image/Image';
import { saveToLocalStorage } from "@utils/storage";
import Theme from '@assets/images/theme.png';
import styles from './ImagesList.module.css';

interface ImagesListProps {
  images: Array<ImageItem>;
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
        saveToLocalStorage<string>('activeTheme',themePath);
      }, 200);
    }
  };

  return (
    <div className={styles.wrapper}>
      {images.map(({isVertical, imgPath, alt}) => (
        <button 
          className={clsx(styles.button, theme === imgPath ? styles.activeButton : null, isVertical && styles.verticalImg)} 
          key={imgPath}
          onClick={() => onClickButton(imgPath)}
          disabled={isThemeChanging && theme !== imgPath}
          aria-label='Кнопка выбора фона'
        >
          <img src={imgPath} className={styles.img} alt={alt} />
          {theme === imgPath ? <Icon icon='image' className={styles.icon} /> : null}
        </button>
      ))}
    </div>
  );
};