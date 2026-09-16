import type { ContactLink } from '@/content/types';
import styles from './Contact.module.css';

interface ContactProps {
  heading: string;
  links: readonly ContactLink[];
  colophon: string;
  backToTop: string;
}

export function Contact({ heading, links, colophon, backToTop }: ContactProps) {
  return (
    <>
      <h3 className={`${styles.heading} t-display-2`}>{heading}</h3>

      <div className={styles.links}>
        {links.map((link) => (
          <a key={link.href} className={styles.link} href={link.href}>
            <span className={`${styles.linkLabel} t-label-sm`}>{link.label}</span>
            <span className="t-contact-value">{link.value}</span>
          </a>
        ))}
      </div>

      <div className={styles.colophon}>
        <span className={`${styles.colophonText} t-colophon`}>{colophon}</span>
        <a className={`${styles.backToTop} t-nav`} href="#overview">
          {backToTop}
        </a>
      </div>
    </>
  );
}
