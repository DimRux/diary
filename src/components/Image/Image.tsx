import { FC , useState, Dispatch, SetStateAction } from "react"
import Theme from '@assets/images/theme.png';
import { clsx } from "@utils/.";
import { Modal, Icon } from "@ui/.";
import { ImageModalContent } from "@components/.";
import styles from './Image.module.css';

interface ImageProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  activeTheme: string,
  setActiveTheme: Dispatch<SetStateAction<string>>
}

export interface ImageItem {
  isVertical: boolean;
  imgPath: string;
  alt: string;
}

export const Image: FC<ImageProps> = ({ activeTheme, setActiveTheme, ...props }) => {
  const [images, setImages] = useState<Array<ImageItem>>([]);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
      <button type="button"
        className={clsx(styles.button, activeTheme !== Theme && styles.imgBtn, (isHovered && activeTheme !== Theme) && styles.photo)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        aria-label="Изменить тему"
        onClick={(e) => {
          setShowModal(prevState => !prevState);
          setIsVisible(true);
          e.stopPropagation();
        }}
        {...props}
        >
        <img src={activeTheme} width={380} height={240} className={styles.img} alt='тема'  />
        {activeTheme === Theme && <Icon icon='image' className={styles.iconImg} />}
      </button>
      {(activeTheme !== Theme && isHovered) && (
          <button 
            className={styles.delTheme}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(true)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            onClick={(e) => {
              setActiveTheme(Theme);
              e.stopPropagation();
            }}>
            <Icon icon="delete" />
          </button>
        )}

        <Modal
          isShow={showModal}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setShowModal={setShowModal}
        >
          <ImageModalContent images={images} setImages={setImages} setActiveTheme={setActiveTheme} setShowModal={setShowModal} setIsVisible={setIsVisible} />
        </Modal>
    </>
  )
}
