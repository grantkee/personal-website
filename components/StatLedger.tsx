import type { StatRow } from '@/content/types';
import { withProofs } from '@/lib/format';
import styles from './StatLedger.module.css';

/**
 * A description list, because that is what this is: a term and its definition.
 * <dl>/<dt>/<dd> also gives a screen reader the pairing for free, which a
 * div soup of numerals and paragraphs does not.
 */
export function StatLedger({ rows }: { rows: readonly StatRow[] }) {
  return (
    <dl>
      {rows.map((row) => {
        const { body, trailing } = withProofs(row.explanation, row.proof ? [row.proof] : undefined);
        return (
          <div key={row.value} className={styles.row} data-reveal>
            <dt className={`${styles.value} t-stat`}>{row.value}</dt>
            <dd className={`${styles.explanation} t-body`}>
              {body}
              {trailing.map((p) => (
                <span key={p.href}>
                  {' '}
                  <a className="link" href={p.href}>
                    {p.label}
                  </a>
                </span>
              ))}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
