import type { Card } from '@/content/types';
import styles from './CardGrid.module.css';

export function CardGrid({ cards }: { cards: readonly Card[] }) {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <article key={card.title} className={styles.card} data-reveal>
          <h3 className={`${styles.title} t-card-title`}>{card.title}</h3>
          <p className={`${styles.body} t-body-sm`}>{card.body}</p>
          {card.proof ? (
            <ul className={`${styles.proofs} t-body-sm`}>
              {card.proof.map((proof) => (
                <li key={proof.href}>
                  <a className="link" href={proof.href}>
                    {proof.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
