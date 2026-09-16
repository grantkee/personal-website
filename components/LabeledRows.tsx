import type { LabeledRow } from '@/content/types';
import styles from './LabeledRows.module.css';

export function LabeledRows({ intro, rows }: { intro: string; rows: readonly LabeledRow[] }) {
  return (
    <>
      <p className={`${styles.intro} t-lede-sm`} data-reveal>
        <span className={styles.introText}>{intro}</span>
      </p>
      <dl>
        {rows.map((row) => (
          <div key={row.label} className={styles.row} data-reveal>
            <dt className="t-label-row">{row.label}</dt>
            <dd className={styles.bodyAndLinks}>
              {row.body ? <p className={`${styles.body} t-meta`}>{row.body}</p> : null}
              {row.links ? (
                <ul className={`${styles.links} t-meta`}>
                  {row.links.map((link) => (
                    <li key={link.href}>
                      <a className="link" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
