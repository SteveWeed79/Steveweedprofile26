'use client';

import { useEffect } from 'react';

/**
 * One client island that powers two motion behaviours without turning the
 * page sections into client components:
 *   1. Reveal-on-scroll for any element marked with [data-reveal].
 *   2. Scroll-spy that toggles .is-active on nav links pointing at #sections.
 * Both are no-ops (content shown immediately) under prefers-reduced-motion.
 */
export default function ScrollFX() {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Reveal ──
    const revealables = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (reduce || !('IntersectionObserver' in window)) {
      revealables.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      revealables.forEach((el) => revealObserver.observe(el));
    }

    // ── Scroll-spy ──
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav__link[href^="#"]'));
    const sections = navLinks
      .map((link) => document.getElementById(link.getAttribute('href')!.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    let spyObserver: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window && sections.length > 0) {
      spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach((link) =>
              link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`),
            );
          });
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((el) => spyObserver!.observe(el));
    }

    return () => spyObserver?.disconnect();
  }, []);

  return null;
}
