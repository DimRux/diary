import { FC , Dispatch, SetStateAction, useState, useEffect } from "react"
import { clsx } from "@utils/.";
import { ImagesList } from "@components/.";
import { Icon, Input, Loader } from "@ui/.";
import { useScrollWatcher } from "@hooks/useScrollWatcher";
import { useDebounce } from "@hooks/useDebounce";
import { ImageItem } from "@components/.";
import { fetchImages } from "@api/imagesServis";
import NoResult from '@assets/images/noResults.png';
import styles from './ImageModalContent.module.css';



interface ModalContentProps {
  images: Array<ImageItem>,
  setImages: Dispatch<SetStateAction<Array<ImageItem>>>,
  setActiveTheme: Dispatch<SetStateAction<string>> ,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

export const ImageModalContent: FC<ModalContentProps> = ({ images, setImages, setActiveTheme, setShowModal }) => {
  const [scrollRef, isScrolled] = useScrollWatcher<HTMLDivElement>();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    fetchImages(debouncedValue, setLoading, setImages);
  }, [debouncedValue]);

  return (
    <>
      <div className={clsx(styles.modalInputWrapper, isScrolled && styles.line)} >
        <Input
          className={styles.modalInput}
          placeholder="Поиск"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <button 
            className={styles.buttonClean} 
            onClick={(e) => {
              setValue('')
              e.stopPropagation();
            }} 
            aria-label="Очистить поле ввода">
            <Icon icon='cleanText' />
          </button>
        )}
      </div>
      <div className={clsx(styles.modalImgListWrapper, loading && styles.modalHeight, images.length === 0 && styles.modalHeight)} ref={scrollRef}>
        {loading && (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}
        {(!loading && images.length !== 0) && (
          <ImagesList
            images={images}
            setActiveTheme={setActiveTheme}
            setShowModal={setShowModal}
          />
        )}
        {(!loading && images.length === 0) && (
          <div className={styles.feedbackWrapper}>
            <img src={NoResult} width={200} height={220} alt="НЛО" />
            <p>По твоему запросу ничего не найдено</p>
          </div>
        )}
      </div>
    </>
  )
}

    