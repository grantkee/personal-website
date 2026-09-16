import type { ReactNode } from 'react';
import { ordinal } from '@/lib/format';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  /** Array position. Rendered zero-padded; nothing stores its own number. */
  index: number;
  label: string;
  children: ReactNode;
  /** Contact renders as <footer>; sections 01–04 sit inside <main>. */
  as?: 'section' | 'footer';
  tone?: 'light' | 'dark';
  className?: string;
}

export function Section({
  id,
  index,
  label,
  children,
  as: Tag = 'section',
  tone = 'light',
  className,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={[
        styles.section,
        Tag === 'footer' ? styles.footer : '',
        tone === 'dark' ? 'tone-dark' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby={`${id}-heading`}
    >
      <div className="shell">
        <div className={styles.grid}>
          <h2 id={`${id}-heading`} className={`${styles.rail} t-label`}>
            {/* aria-hidden so this reads as "At a glance", not "zero one at a
                glance". The numeral is ordinal wayfinding for sighted readers;
                a screen reader already announces heading position. */}
            <span className={styles.numeral} aria-hidden="true">
              {ordinal(index)}
            </span>
            <span className={styles.railLabel}>{label}</span>
          </h2>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </Tag>
  );
}
