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
            <p className={`${styles.proof} t-body-sm`}>
              <a className="link" href={card.proof.href}>
                {card.proof.label}
              </a>
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
