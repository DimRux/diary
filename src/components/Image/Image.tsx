import { FC , useState } from "react"
import Theme from '@assets/images/theme.png';
import Img1 from '@assets/images/img1.jpg';
import Img2 from '@assets/images/img2.jpg';
import Img3 from '@assets/images/img3.jpg';
import Img4 from '@assets/images/img4.jpg';
import Img5 from '@assets/images/img5.jpg';
import Img6 from '@assets/images/img6.jpg';
import { clsx } from "@utils/.";
import { ImagesList } from "@components/.";
import { Input, Modal, Icon } from "@ui/.";
import styles from './Image.module.css';

interface ImgProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Image: FC<ImgProps> = ({ ...props }) => {
  const images = [Img1, Img2, Img3, Img4, Img5, Img6];
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

        <Modal
          isShow={showModal}
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
        >
          <div className={styles.modalInputWrapper}>
            <Input
              className={styles.modalInput}
              placeholder="Поиск"
            />
          </div>
          <div className={styles.modalImgListWrapper}>
            <ImagesList
              images={images}
              setActiveTheme={setActiveTheme}
              setShowModal={setShowModal}
            />
          </div>
        </Modal>

    </>
  )
}
