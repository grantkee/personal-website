'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section the reader is currently in.
 *
 * Same rAF-throttled algorithm the canvas runtime used, with one change that
 * matters in React: setState only fires when the computed id actually changes.
 * The original repainted inline styles on every animation frame, which here
 * would be a re-render per frame for the whole nav.
 */
export function useScrollSpy(ids: readonly string[], offset = 150): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Depend on the contents rather than the array identity, so a caller passing
  // a freshly-built array does not re-subscribe on every render.
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|').filter(Boolean);
    let frame = 0;

    const compute = () => {
      frame = 0;
      const threshold = window.scrollY + offset;
      let current: string | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) current = id;
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(compute);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    compute();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [key, offset]);

  return activeId;
}
