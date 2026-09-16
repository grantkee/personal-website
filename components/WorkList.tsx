import type { WorkItem } from '@/content/types';
import { ordinal, withProofs } from '@/lib/format';
import styles from './WorkList.module.css';

export function WorkList({ items }: { items: readonly WorkItem[] }) {
  return (
    <div>
      {items.map((item, i) => {
        const { body, trailing } = withProofs(item.detail, item.proof);
        return (
          <article key={item.kicker} className={styles.article} data-reveal>
            <div className={styles.header}>
              {/* Ordinal wayfinding for sighted readers. The heading below
                  carries the accessible name on its own. */}
              <span className={`${styles.index} t-index`} aria-hidden="true">
                {ordinal(i + 1)}
              </span>
              <h3 className={`${styles.title} t-title`}>{item.title}</h3>
              <span className={`${styles.kicker} t-kicker`}>{item.kicker}</span>
            </div>

            <div className={styles.body}>
              <p className={`${styles.lead} t-body-strong`}>{item.lead}</p>
              <p className={`${styles.detail} t-body-sm`}>
                {body}
                {trailing.map((p) => (
                  <span key={p.href}>
                    {' '}
                    <a className="link" href={p.href}>
                      {p.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>

            <ul className={styles.tags}>
              {item.tags.map((tag) => (
                <li key={tag} className={`${styles.tag} t-tag`}>
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
