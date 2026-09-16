import Image from 'next/image';
import type { Hero as HeroContent } from '@/content/types';
import styles from './Hero.module.css';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <header id="overview" className={`tone-dark ${styles.hero}`}>
      <div className="shell">
        <div className={`${styles.indexRow} t-label-sm`}>
          <span>{hero.indexLabel}</span>
          <span>{hero.title}</span>
        </div>

        <div className={styles.main}>
          <div className={styles.avatarCell}>
            <Image
              className={styles.avatar}
              src={hero.avatar.src}
              alt={hero.avatar.alt}
              width={hero.avatar.width}
              height={hero.avatar.height}
              priority
            />
          </div>

          <div>
            <h1 className={`${styles.name} t-display-1`}>{hero.name}</h1>

            <dl className={styles.meta}>
              {hero.meta.map((cell) => (
                <div key={cell.label} className={styles.cell}>
                  <dt className={`${styles.cellLabel} t-label-sm`}>{cell.label}</dt>
                  <dd className={`${styles.cellBody} t-meta`}>
                    {cell.body}
                    {cell.asOf ? (
                      <span className={`${styles.asOf} t-label-sm`}>As of {cell.asOf}</span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>

            <p className={`${styles.lede} t-lede`}>{hero.lede}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
