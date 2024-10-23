import { FC, MouseEventHandler, Dispatch, SetStateAction, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";
import { useOutsideClick } from "@hooks/useOutsideClick";
import styles from "./Modal.module.css"

interface ModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>,
  onClose: MouseEventHandler;
  children: ReactNode,
  isShow: boolean,
}

export const Modal: FC<ModalProps> = ({ isShow, onClose, setShowModal, children }) => {
  const portalRoot = document.getElementById('root');
  if (!portalRoot) {
    throw new Error('Нет div с id root')
  };

  const contentRef = useOutsideClick<HTMLDivElement>(() => {
    if(isShow) {
      setShowModal(false);
    }
  });

  return (
    <>
    {isShow && createPortal(
      <div className={styles.wrapper} >
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
        <button className={styles.close} onClick={onClose}>
            <Icon icon="cleanText" width={32} height={32} />
          </button>
      </div>, 
      portalRoot)}
    </>
  );
}