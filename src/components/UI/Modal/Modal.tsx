import { FC, Dispatch, SetStateAction, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { useFocusTrap } from "@hooks/useFocusTrap";
import { clsx } from "@utils/clsx";
import styles from "./Modal.module.css"

interface ModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setIsVisible: Dispatch<SetStateAction<boolean>>,
  children: ReactNode,
  isShow: boolean,
  isVisible: boolean,
}

export const Modal: FC<ModalProps> = ({ isShow, setShowModal, isVisible, setIsVisible, children }) => {
  const modal = document.querySelector('#modals');
  if (!modal) {
    throw new Error('Элемента нет');
  }

  const wrapperRef = useRef(null);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  const contentRef = useOutsideClick<HTMLDivElement>(handleClose);

  useFocusTrap(wrapperRef, isShow);

  return (
    <>
    {(isShow || isVisible) && createPortal(
      <div className={clsx(styles.wrapper, isVisible ? styles.fadeIn : clsx(styles.fadeOut, styles.disabled) )} ref={wrapperRef} >
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
        <button className={styles.close} onClick={handleClose} aria-label="Закрыть модальное окно">
            <Icon icon="cleanText" width={32} height={32} />
          </button>
      </div>, 
      modal)}
    </>
  );
}