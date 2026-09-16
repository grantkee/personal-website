import styles from './SkipLink.module.css';

/** First element in the DOM, so it is the first tab stop from a fresh load. */
export function SkipLink() {
  return (
    <a className={`${styles.skip} t-nav`} href="#main">
      Skip to content
    </a>
  );
}
