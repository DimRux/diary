import { FC , Dispatch, SetStateAction } from "react"
import { clsx } from "@utils/.";
import { ImagesList } from "@components/.";
import { Input } from "@ui/.";
import { useScrollWatcher } from "@hooks/useScrollWatcher";
import styles from './ImageModalContent.module.css';

interface ModalContentProps {
  images: string[],
  setActiveTheme: Dispatch<SetStateAction<string>> ,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

export const ImageModalContent: FC<ModalContentProps> = ({ images, setActiveTheme, setShowModal }) => {
  const [scrollRef, isScrolled] = useScrollWatcher<HTMLDivElement>();

  return (
    <>
      <div className={clsx(styles.modalInputWrapper, isScrolled && styles.line)} >
        <Input
          className={styles.modalInput}
          placeholder="Поиск"
        />
      </div>
      <div className={styles.modalImgListWrapper} ref={scrollRef}>
        <ImagesList
          images={images}
          setActiveTheme={setActiveTheme}
          setShowModal={setShowModal}
        />
      </div>
    </>
  )
}