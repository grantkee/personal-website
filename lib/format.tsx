import { Fragment, type ReactNode } from 'react';
import type { Proof } from '@/content/types';

/**
 * Section and work-item numbers derive from array position. Nothing carries an
 * index field, so reordering or inserting renumbers everything for free.
 */
export function ordinal(index: number): string {
  return String(index).padStart(2, '0');
}

/**
 * Renders prose with each proof link attached to the phrase it proves.
 *
 * Content strings carry no markup, so the link is woven in here: the proof's
 * `label` is matched inside the text and replaced with an anchor. That is what
 * enforces "the link attaches to the claim it proves" -- you cannot add a link
 * without naming the phrase it belongs to.
 *
 * If a label is not found verbatim the link is appended rather than dropped,
 * because silently losing a citation is the worse failure. `trailing` returns
 * those separately so a caller can place them deliberately.
 */
export function withProofs(
  text: string,
  proofs: readonly Proof[] | undefined
): { body: ReactNode; trailing: Proof[] } {
  if (!proofs || proofs.length === 0) return { body: text, trailing: [] };

  const trailing: Proof[] = [];
  let nodes: ReactNode[] = [text];

  for (const proof of proofs) {
    let placed = false;
    const next: ReactNode[] = [];

    for (const node of nodes) {
      if (placed || typeof node !== 'string') {
        next.push(node);
        continue;
      }
      const at = node.indexOf(proof.label);
      if (at === -1) {
        next.push(node);
        continue;
      }
      next.push(
        node.slice(0, at),
        <a key={proof.href} className="link" href={proof.href}>
          {proof.label}
        </a>,
        node.slice(at + proof.label.length)
      );
      placed = true;
    }

    nodes = next;
    if (!placed) trailing.push(proof);
  }

  return {
    body: nodes.map((node, i) => <Fragment key={i}>{node}</Fragment>),
    trailing,
  };
}
