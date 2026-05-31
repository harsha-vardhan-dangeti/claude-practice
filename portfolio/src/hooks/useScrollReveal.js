import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset then re-observe whenever the page changes
    document.querySelectorAll('.r').forEach(el => el.classList.remove('in'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.r').forEach(el => {
      if (el.closest('#hero')) { el.classList.add('in'); return; }
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);
}
