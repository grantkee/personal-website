'use client';

import { useEffect } from 'react';

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 *
 * Reveal is an attribute, not a wrapper component. Wrapping each revealed
 * element would drag the entire content tree across the server boundary and
 * ship it as client JavaScript, for an animation.
 *
 * Reduced motion is handled in globals.css, so there is exactly one code path
 * here: observe, mark, unobserve.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
