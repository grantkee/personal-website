import { content } from '@/content';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { StatLedger } from '@/components/StatLedger';
import { WorkList } from '@/components/WorkList';
import { LabeledRows } from '@/components/LabeledRows';
import { CardGrid } from '@/components/CardGrid';
import { Contact } from '@/components/Contact';

/**
 * Resolves a section by id and hands back its array position, which is the
 * only source of its number. Renaming an id is a build error rather than a
 * page that silently renumbers itself.
 */
function locate(id: string) {
  const index = content.sections.findIndex((section) => section.id === id);
  const section = content.sections[index];
  if (!section) throw new Error(`page.tsx references an unknown section: "${id}"`);
  return { index, label: section.label };
}

const overview = locate('overview');
const numbers = locate('numbers');
const work = locate('work');
const source = locate('source');
const now = locate('now');
const contact = locate('contact');

export default function Page() {
  return (
    <>
      <Hero hero={content.hero} index={overview.index} label={overview.label} />

      <main id="main">
        <Section id="numbers" index={numbers.index} label={numbers.label}>
          <StatLedger rows={content.numbers.rows} />
        </Section>

        <Section id="work" index={work.index} label={work.label}>
          <WorkList items={content.work.items} />
        </Section>

        <Section id="source" index={source.index} label={source.label}>
          <LabeledRows intro={content.source.intro} rows={content.source.rows} />
        </Section>

        <Section id="now" index={now.index} label={now.label}>
          <CardGrid cards={content.now.cards} />
        </Section>
      </main>

      <Section
        id="contact"
        index={contact.index}
        label={contact.label}
        as="footer"
        tone="dark"
      >
        <Contact
          heading={content.contact.heading}
          links={content.contact.links}
          colophon={content.contact.colophon}
          backToTop={content.contact.backToTop}
        />
      </Section>
    </>
  );
}
