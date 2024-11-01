import { FC , useState } from "react"
import Theme from '@assets/images/theme.png';
import { clsx } from "@utils/.";
import { Modal, Icon } from "@ui/.";
import { ImageModalContent } from "@components/.";
import styles from './Image.module.css';

interface ImgProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Image: FC<ImgProps> = ({ ...props }) => {
  const [images, setImages] = useState<string[]>([]);
  const [activeTheme, setActiveTheme] = useState(Theme);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button type="button"
        className={clsx(styles.button, activeTheme !== Theme && styles.imgBtn)}
        aria-label="Изменить тему"
        onClick={(e) => {
          setShowModal(prevState => !prevState);
          e.stopPropagation();
        }}
        {...props}
        >
        <img src={activeTheme} width={380} height={240} className={styles.img} alt='тема'  />
        {activeTheme === Theme && <Icon icon='image' className={styles.iconImg} />}
      </button>
      {activeTheme !== Theme && (
          <button 
            className={styles.delTheme}
            onClick={(e) => {
              setActiveTheme(Theme)
              e.stopPropagation();
            }}>
            <Icon icon="cleanText" />
          </button>
        )}

        <Modal
          isShow={showModal}
          setShowModal={setShowModal}
        >
          <ImageModalContent images={images} setImages={setImages} setActiveTheme={setActiveTheme} setShowModal={setShowModal} />
        </Modal>
    </>
  )
}
