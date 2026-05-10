'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Lang } from '@/lib/translations';
import { translations } from '@/lib/translations';
import { asset } from '@/lib/basePath';

/**
 * Hero — clean camp/youth program editorial.
 * Left: copy with clear hierarchy. Right: photo composition with one main + one supporting image.
 */
export default function HeroEditorial({ lang }: { lang: Lang }) {
  const t = translations[lang];

  const medicaidText =
    lang === 'en'
      ? { text: 'Fully covered by Florida Medicaid', sub: 'For eligible families' }
      : { text: 'Cubierto por Medicaid de Florida', sub: 'Para familias elegibles' };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
    >
      {/* Subtle background texture — nothing busy */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-sage-50" />
        <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-gradient-to-bl from-sage-50/60 via-transparent to-transparent" />
      </div>

      <div className="container-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT — Copy */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Logo + eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <Image
                src={asset("/logos/hgt-logo.png")}
                alt="Heal Grow Thrive"
                width={150}
                height={150}
                priority
                className="w-[60px] sm:w-[68px] h-auto"
              />
              <div className="h-10 w-px bg-ink/10" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-700">
                  {lang === 'en' ? 'Summer 2026' : 'Verano 2026'}
                </div>
                <div className="text-[11px] font-medium text-ink-400 mt-0.5">
                  {lang === 'en' ? 'Winter Park, Florida' : 'Winter Park, Florida'}
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="h-display mb-5"
            >
              A summer where your child{' '}
              <em className="not-italic font-medium text-teal-700 italic">actually</em>{' '}
              belongs.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="body-lg max-w-xl mb-8"
            >
              A 9-week clinical life skills program for kids 4–17 with{' '}
              <span className="text-ink font-semibold">ADHD, autism, anxiety, and behavioral challenges.</span>
            </motion.p>

            {/* Medicaid badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-teal-100 shadow-card-sm mb-8"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-700 text-white grid place-items-center text-sm font-extrabold">
                $0
              </span>
              <div>
                <div className="font-bold text-ink text-[14px] leading-tight">
                  {medicaidText.text}
                </div>
                <div className="text-[12px] text-ink-400 mt-0.5">{medicaidText.sub}</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a href="#apply" className="btn-primary">
                {t.hero.cta}
              </a>
              <a href="#how" className="btn-ghost">
                {lang === 'en' ? 'How it works' : 'Cómo funciona'}
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-400"
            >
              {['AHCA-Accredited', 'Florida Medicaid Provider', 'Licensed Clinicians'].map((b, i) => (
                <span key={b} className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {b}
                </span>
              ))}
            </motion.div>

            {/* Partner mark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-6 flex items-center gap-3 pt-6 border-t border-ink/[0.08] max-w-sm"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400">
                {lang === 'en' ? 'In partnership with' : 'En alianza con'}
              </span>
              <Image
                src={asset("/logos/thrive-blossom-logo.png")}
                alt="Thrive and Blossom"
                width={60}
                height={60}
                className="h-9 w-auto"
              />
            </motion.div>
          </div>

          {/* RIGHT — Photo composition (one main + one supporting) */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            {/* Soft accent shapes behind */}
            <div className="absolute -inset-4 -z-10" aria-hidden>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-teal-100/50 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-sand-200/40 blur-3xl" />
            </div>

            <div className="grid grid-cols-12 grid-rows-6 gap-4 sm:gap-5 lg:gap-6 max-w-2xl mx-auto lg:max-w-none">
              {/* MAIN photo — large, dominant */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="col-span-12 sm:col-span-8 row-span-6 photo-card aspect-[4/5]"
              >
                <Image
                  src={asset("/photos/hero.jpg")}
                  alt="Child engaged in therapy session with calming therapy dog"
                  fill
                  className="object-cover img-warm"
                  style={{ objectPosition: '50% 30%' }}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 500px"
                  quality={92}
                />
                {/* Bottom enrolling badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto inline-flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur shadow-card-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
                  </span>
                  <span className="text-[12px] font-semibold text-ink">
                    {lang === 'en' ? 'Now enrolling Winter Park 2026' : 'Inscripciones abiertas Winter Park 2026'}
                  </span>
                </motion.div>
              </motion.div>

              {/* SUPPORTING photo — small, top right */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="hidden sm:block col-span-4 row-span-3 photo-card"
              >
                <Image
                  src={asset("/photos/group-session.jpg")}
                  alt="Group therapy session"
                  fill
                  className="object-cover img-warm"
                  sizes="(max-width: 1024px) 25vw, 200px"
                  quality={92}
                />
              </motion.div>

              {/* Stats card — bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
                className="hidden sm:flex col-span-4 row-span-3 card flex-col justify-center p-5"
              >
                <div className="font-serif italic text-3xl text-teal-700 leading-none mb-1">
                  9 wks
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
                  {lang === 'en' ? 'Of structured care' : 'De cuidado estructurado'}
                </div>
                <div className="mt-3 pt-3 border-t border-ink/[0.08]">
                  <div className="font-serif italic text-2xl text-teal-700 leading-none mb-1">
                    5 days
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
                    {lang === 'en' ? 'A week' : 'A la semana'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
