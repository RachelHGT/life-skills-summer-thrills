'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollExpandMedia from './ScrollExpandMedia';
import type { Lang } from '@/lib/translations';
import { translations } from '@/lib/translations';

export default function HeroScrollExpand({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <ScrollExpandMedia
      mediaType='image'
      mediaSrc='/photos/hero.jpg'
      bgImageSrc='/photos/beach-walk.jpg'
      title={t.hero.brand}
      titleSplit={['Life Skills,', 'Summer Thrills']}
      date={t.hero.sceneDate}
      scrollToExpand={t.hero.scrollHint}
      textBlend={false}
    >
      {/* Reveal content — appears after media expansion completes */}
      <div className='max-w-3xl mx-auto text-center'>
        {/* Brand wordmark + powered-by */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex flex-col items-center mb-7'
        >
          <h2 className='font-serif italic text-2xl sm:text-[28px] text-teal-700 leading-[1.05] tracking-tight'>
            <span className='block'>Life Skills,</span>
            <span className='block'>Summer Thrills</span>
          </h2>
          <div className='mt-2 inline-flex items-center gap-2'>
            <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400'>
              {t.hero.poweredBy}
            </span>
            <Image
              src="/logos/hgt-logo.png"
              alt='Heal Grow Thrive'
              width={80}
              height={80}
              className='w-7 h-auto opacity-90'
              priority
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className='h-display mb-5'
        >
          {t.hero.headlineLead}{' '}
          <em className='not-italic font-medium text-teal-700 italic'>
            {t.hero.headlineEm}
          </em>{' '}
          {t.hero.headlineTrail}
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='body-lg max-w-2xl mx-auto mb-8'
        >
          {t.hero.subheadline}
        </motion.p>

        {/* Coverage badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-teal-100 shadow-card-sm mb-8'
        >
          <span className='flex-shrink-0 w-10 h-10 rounded-xl bg-teal-700 text-white grid place-items-center text-sm font-extrabold'>
            $0
          </span>
          <div className='text-left'>
            <div className='font-bold text-ink text-[15px] leading-tight'>
              {t.hero.coverage}
            </div>
            <div className='text-[12px] text-ink-400 mt-0.5'>
              {t.hero.coverageSub}
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='flex flex-col sm:flex-row gap-3 justify-center mb-10'
        >
          <a href='#apply' className='btn-primary'>
            {t.hero.cta}
          </a>
          <a href='#how' className='btn-ghost'>
            {lang === 'en' ? 'How it works' : 'Cómo funciona'}
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-ink-400'
        >
          {(lang === 'en'
            ? ['AHCA-Accredited', 'Level 2 Background-Screened Staff', 'Licensed Clinicians']
            : ['Acreditado por AHCA', 'Personal con verificación Nivel 2', 'Médicos licenciados']
          ).map((b) => (
            <span key={b} className='flex items-center gap-1.5'>
              <svg width='13' height='13' viewBox='0 0 14 14' fill='none'>
                <circle cx='7' cy='7' r='6' stroke='currentColor' strokeWidth='1.2' />
                <path d='M4 7l2 2 4-4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
              </svg>
              {b}
            </span>
          ))}
        </motion.div>

        {/* Partner mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className='mt-10 inline-flex items-center gap-3 pt-6 border-t border-ink/[0.08]'
        >
          <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400'>
            {t.hero.partnerLabel}
          </span>
          <Image
            src="/logos/thrive-blossom-logo.png"
            alt='Thrive and Blossom'
            width={60}
            height={60}
            className='h-9 w-auto'
          />
        </motion.div>
      </div>
    </ScrollExpandMedia>
  );
}
