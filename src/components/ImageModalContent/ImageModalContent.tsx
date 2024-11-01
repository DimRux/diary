import { FC , Dispatch, SetStateAction, useState, useEffect } from "react"
import { clsx } from "@utils/.";
import { ImagesList } from "@components/.";
import { Icon, Input, Loader } from "@ui/.";
import { useScrollWatcher } from "@hooks/useScrollWatcher";
import NoResult from '@assets/images/noResults.png';
import styles from './ImageModalContent.module.css';

interface ImageApi {
  urls: {
    small: string;
  };
}

interface ModalContentProps {
  images: string[],
  setImages: Dispatch<SetStateAction<string[]>> ,
  setActiveTheme: Dispatch<SetStateAction<string>> ,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

export const ImageModalContent: FC<ModalContentProps> = ({ images, setImages, setActiveTheme, setShowModal }) => {
  const [scrollRef, isScrolled] = useScrollWatcher<HTMLDivElement>();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const getFoto = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?count=10&client_id=WNhe5860GoCFUBtVIqLOPP6CTNfKN_7H-2fkhZs6e24`);
        const data: ImageApi[] = await response.json();
        const dataUrl = data.map((img) => img.urls.small);
        console.log(data)
        setImages(dataUrl);
      } catch (error) {
        console.error('Ошибка при получении изображений:', error);
      } finally {
      setLoading(false);
      }
    };

    getFoto();
  }, []);

  useEffect(() => {
    
    const getFoto = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${value}&client_id=WNhe5860GoCFUBtVIqLOPP6CTNfKN_7H-2fkhZs6e24&per_page=10`);
        const data: { results: ImageApi[] } = await response.json();
        const dataUrl = data.results.map((img) => img.urls.small);
        
        setImages(dataUrl);
      } catch (error) {
        console.error('Ошибка при получении изображений:', error);
      } finally {
      setLoading(false);
      }
    };
    
    if (value) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        getFoto();
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setImages([]);
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };

  }, [value]);

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
            <img src={NoResult} width={200} height={220} />
            <p>По твоему запросу ничего не найдено</p>
          </div>
        )}
      </div>
    </>
  )
}