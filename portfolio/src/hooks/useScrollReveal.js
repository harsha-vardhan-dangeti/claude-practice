import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
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
  }, []);
}
