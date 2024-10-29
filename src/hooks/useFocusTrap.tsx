import { useEffect, useRef, RefObject } from 'react';

export const useFocusTrap = (modalRef: RefObject<HTMLElement>, isShow: boolean) => {
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isShow && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        firstFocusableElementRef.current = focusableElements[0] as HTMLElement;
        lastFocusableElementRef.current = focusableElements[focusableElements.length - 1] as HTMLElement;
        firstFocusableElementRef.current.focus();
      }
      const trapFocus = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstFocusableElementRef.current) {
              event.preventDefault();
                lastFocusableElementRef.current?.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElementRef.current) {
              event.preventDefault();
              firstFocusableElementRef.current?.focus();
            }
          }
        }
      };
      document.addEventListener('keydown', trapFocus);

      return () => {
        document.removeEventListener('keydown', trapFocus);
      };
    }
  }, [isShow, modalRef]);

  return modalRef;
};