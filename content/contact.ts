import type { ContactLink } from './types';

export const heading = 'Open to board and investor conversations.';

/**
 * Six cells, so the grid steps 3 -> 2 -> 1 with no orphan row. Every `value`
 * is the address the `href` actually goes to; the artboard shipped two that
 * displayed a profile path and linked a bare homepage.
 */
export const links: ContactLink[] = [
  { label: 'Email', value: 'hello@grantkee.com', href: 'mailto:hello@grantkee.com' },
  { label: 'GitHub', value: 'github.com/grantkee', href: 'https://github.com/grantkee' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/grantkee',
    href: 'https://www.linkedin.com/in/grantkee/',
  },
  { label: 'X', value: 'x.com/9rantkee', href: 'https://x.com/9rantkee' },
  {
    label: 'Telcoin Forum',
    value: 'forum.telcoin.org/u/grantkee',
    href: 'https://forum.telcoin.org/u/grantkee',
  },
  {
    label: 'Community sessions',
    value: 'Recorded protocol updates',
    href: 'https://www.youtube.com/watch?v=lDqpQXjVdMA',
  },
];

export const colophon = 'Grant Kee - Director of Blockchain, Telcoin';
export const backToTop = 'Back to top ↑';
