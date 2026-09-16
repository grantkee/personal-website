import type { Metadata } from 'next';
import Link from 'next/link';
import { content } from '@/content';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: `Not found - ${content.site.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className={`tone-dark ${styles.wrap}`}>
      <div className="shell">
        <p className={`${styles.label} t-label-sm`}>404</p>
        <h1 className={`${styles.heading} t-display-2`}>No page at this address.</h1>
        <Link className="link t-contact-value" href="/">
          {content.site.domain}
        </Link>
      </div>
    </main>
  );
}
