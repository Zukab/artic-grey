import {useCallback, useState, useEffect} from 'react';

export function useScroll(ref: React.RefObject<HTMLElement>) {
  const [y, setY] = useState(0);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      setY(ref.current.scrollTop);
    }
  }, [ref]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, ref]);

  return {y};
}
