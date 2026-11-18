import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Delay slightly for React render/DOM mount
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, hash]);

  return null;
}
