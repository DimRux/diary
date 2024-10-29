import { useEffect, useState, useRef } from 'react';

export const useScrollWatcher = <TypeRef extends HTMLElement = HTMLElement>() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<TypeRef>(null);
  

  useEffect(() => {
    const element = scrollRef.current;
    
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop } = element;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [scrollRef, isScrolled] as const;
};
