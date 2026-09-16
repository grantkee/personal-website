'use client';

import { useEffect, useRef } from 'react';
import type { Section } from '@/content/types';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import styles from './Nav.module.css';

const MD = '(min-width: 768px)';

export function Nav({ sections }: { sections: readonly Section[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const navSections = sections.filter((s) => !s.hiddenFromNav);
  const activeId = useScrollSpy(navSections.map((s) => s.id));

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const close = () => details.removeAttribute('open');

    /* The two things JavaScript adds. Everything else -- open state, keyboard
       activation, aria-expanded -- is native to <details>. */
    const onClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('a')) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !details.open) return;
      close();
      details.querySelector<HTMLElement>('summary')?.focus();
    };

    details.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);

    /* Above md the panel is shown by ::details-content in CSS, which keeps it
       visible without JavaScript. On an engine that lacks that pseudo-element
       the panel would be invisible on desktop, so open the element instead. */
    const supportsDetailsContent =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('selector(::details-content)');

    let media: MediaQueryList | null = null;
    let syncOpen: (() => void) | null = null;

    if (!supportsDetailsContent) {
      media = window.matchMedia(MD);
      syncOpen = () => {
        if (media?.matches) details.setAttribute('open', '');
        else close();
      };
      syncOpen();
      media.addEventListener('change', syncOpen);
    }

    return () => {
      details.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      if (media && syncOpen) media.removeEventListener('change', syncOpen);
    };
  }, []);

  return (
    <nav className={styles.nav} aria-label="Sections">
      <a className={`${styles.brand} t-brand`} href="#overview">
        GK
        <span className={styles.mark} aria-hidden="true" />
      </a>

      <details className={styles.details} ref={detailsRef}>
        <summary className={`${styles.summary} t-nav`}>
          Sections
          <svg
            className={styles.chevron}
            width="9"
            height="6"
            viewBox="0 0 9 6"
            fill="none"
            aria-hidden="true"
          >
            <path d="M1 1.5L4.5 5L8 1.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </summary>

        <div className={styles.panel}>
          {navSections.map((section) => (
            <a
              key={section.id}
              className={`${styles.link} t-nav`}
              href={`#${section.id}`}
              aria-current={activeId === section.id ? 'location' : undefined}
            >
              {section.label}
            </a>
          ))}
        </div>
      </details>
    </nav>
  );
}
