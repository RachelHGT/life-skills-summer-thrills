'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { translations, type Lang } from '@/lib/translations';
import { captureUtmFromUrl } from '@/lib/utm';
import LeadForm from '@/components/LeadForm';
import HeroScrollExpand from '@/components/HeroScrollExpand';

// ─── REUSABLE ANIMATION VARIANTS ────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    captureUtmFromUrl();
    const onScroll = () => setShowStickyCta(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-cream text-ink">
      {/* ───── NAV ───── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-ink/5"
        aria-label="Primary"
      >
        <div className="container-full flex items-center justify-between py-3.5">
          <a href="#top" className="flex items-center gap-2.5 font-bold text-ink">
            <div className="w-9 h-10 relative">
              <Image src="/logos/hgt-logo.png" alt="Heal Grow Thrive" fill className="object-contain" />
            </div>
            <span className="hidden sm:flex flex-col leading-[1.05]">
              <span className="text-[14px] font-bold">Life Skills,</span>
              <span className="text-[14px] font-bold">Summer Thrills</span>
              <span className="text-[9px] font-medium text-ink-400 tracking-wide uppercase mt-0.5">
                {lang === 'en' ? 'Powered by Heal Grow Thrive' : 'Por Heal Grow Thrive'}
              </span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-500">
            <a href="#program" className="hover:text-teal-700 transition-colors">
              {lang === 'en' ? 'Program' : 'Programa'}
            </a>
            <a href="#how" className="hover:text-teal-700 transition-colors">
              {lang === 'en' ? 'How it works' : 'Cómo funciona'}
            </a>
            <a href="#testimonials" className="hover:text-teal-700 transition-colors">
              {lang === 'en' ? 'Stories' : 'Testimonios'}
            </a>
            <a href="#faq" className="hover:text-teal-700 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="px-3 py-1.5 text-xs font-semibold rounded-full border border-ink/[0.15] hover:bg-white transition-colors"
              aria-label={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <a href="#apply" className="hidden sm:inline-flex btn-primary !py-2 !px-4 text-sm">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ───── HERO (scroll-to-expand) ───── */}
      <HeroScrollExpand lang={lang} />

      {/* ───── PROBLEM ───── */}
      <section className="section bg-white" id="problem">
        <div className="container-default">
          <Reveal className="text-center mb-12 lg:mb-16">
            <span className="eyebrow mb-4">{t.problem.eyebrow}</span>
            <h2 className="h2 mt-4 max-w-2xl mx-auto">{t.problem.headline}</h2>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {t.problem.points.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card card-hover p-7 sm:p-8"
              >
                <div className="w-9 h-9 rounded-lg bg-sage-100 grid place-items-center mb-5">
                  <span className="text-teal-700 font-serif italic text-lg">{i + 1}</span>
                </div>
                <p className="text-ink-500 leading-relaxed text-[15px]">{p}</p>
              </motion.div>
            ))}
          </motion.div>

          <Reveal>
            <p className="text-center font-serif italic text-2xl sm:text-3xl text-teal-700">
              {t.problem.closing}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───── PROGRAM HIGHLIGHTS ───── */}
      <section className="section bg-cream" id="program">
        <div className="container-wide">
          <Reveal className="text-center mb-14">
            <span className="eyebrow mb-4">{t.features.eyebrow}</span>
            <h2 className="h2 mt-4 mb-5">{t.features.headline}</h2>
            <p className="body-lg max-w-2xl mx-auto">{t.features.subheadline}</p>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {t.features.items.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card card-hover p-7 sm:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-sage-100 grid place-items-center text-2xl mb-5">
                  {item.icon}
                </div>
                <h3 className="h3 mb-3">{item.title}</h3>
                <p className="text-ink-500 text-[14.5px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── EDITORIAL PHOTO BREAK — life skills in action ───── */}
      <section className="section-tight bg-cream">
        <div className="container-full">
          <Reveal className="text-center mb-8">
            <span className="eyebrow mb-3">
              {lang === 'en' ? 'Life skills in action' : 'Habilidades en acción'}
            </span>
          </Reveal>
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-5 max-w-6xl mx-auto">
            <div className="col-span-12 sm:col-span-5 photo-card aspect-[4/5]">
              <Image
                src="/photos/cooking-class.jpg"
                alt="Cooking class — kids learning life skills"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
            <div className="col-span-12 sm:col-span-7 grid grid-rows-2 gap-4 sm:gap-5">
              <div className="photo-card relative">
                <Image
                  src="/photos/graffiti-art.jpg"
                  alt="Outdoor art class — creative expression"
                  fill
                  className="object-cover img-warm"
                  sizes="(max-width: 640px) 100vw, 55vw"
                />
              </div>
              <div className="photo-card relative">
                <Image
                  src="/photos/dance-class.jpg"
                  alt="Movement and dance therapy"
                  fill
                  className="object-cover img-warm"
                  sizes="(max-width: 640px) 100vw, 55vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── WHO IT SERVES ───── */}
      <section className="section bg-white">
        <div className="container-default text-center">
          <Reveal>
            <span className="eyebrow mb-4">{t.conditions.eyebrow}</span>
            <h2 className="h2 mt-4 mb-10">{t.conditions.headline}</h2>
          </Reveal>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {t.conditions.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={fadeUp}
                className="px-4 py-2.5 rounded-full bg-sage-100 text-teal-800 font-semibold text-sm
                  border border-sage-200 hover:bg-teal-700 hover:text-white hover:border-teal-700
                  transition-colors duration-200 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <Reveal>
            <p className="body-lg max-w-2xl mx-auto mb-8">{t.conditions.footer}</p>
            <a href="#apply" className="btn-primary">
              {t.conditions.cta}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ───── HOW IT WORKS — Medicaid steps ───── */}
      <section className="section bg-teal-700 text-white relative overflow-hidden" id="how">
        {/* Subtle grain */}
        <div className="absolute inset-0 grain opacity-15 mix-blend-overlay" aria-hidden />

        <div className="container-wide relative">
          <Reveal className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-200 mb-4">
              <span className="w-6 h-px bg-teal-300" />
              {t.medicaid.eyebrow}
            </span>
            <h2 className="font-serif font-normal text-white leading-[1.1] tracking-[-0.025em] mt-4 mb-5"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              {t.medicaid.headline}
            </h2>
            <p className="text-[17px] text-teal-100 max-w-xl mx-auto leading-relaxed">
              {t.medicaid.subheadline}
            </p>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {t.medicaid.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/8 backdrop-blur rounded-card-lg p-7 border border-white/10
                  hover:bg-white/12 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white text-teal-800 font-extrabold grid place-items-center mb-5">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">{step.title}</h3>
                <p className="text-teal-50 leading-relaxed text-[14.5px]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <Reveal>
            <p className="text-center text-teal-100 max-w-2xl mx-auto leading-relaxed">
              {t.medicaid.footer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="section bg-cream" id="testimonials">
        <div className="container-wide">
          <Reveal className="text-center mb-14">
            <span className="eyebrow mb-4">{t.testimonials.eyebrow}</span>
            <h2 className="h2 mt-4">{t.testimonials.headline}</h2>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {t.testimonials.items.map((tst, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card p-7 sm:p-8 flex flex-col"
              >
                <div className="text-coral text-2xl mb-3 leading-none" aria-hidden>"</div>
                <p className="text-ink-600 leading-relaxed mb-6 flex-1 text-[15px]">
                  {tst.quote}
                </p>
                <div className="pt-5 border-t border-ink/[0.08] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 grid place-items-center font-serif font-semibold text-teal-700 text-base">
                    {tst.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-ink">{tst.name}</div>
                    <div className="text-[11px] text-ink-400 mt-0.5 flex items-center gap-1">
                      <span className="text-yellow-500 text-[10px]">★★★★★</span>
                      <span>Google Review</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── DAY SCHEDULE — split with photo ───── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <Reveal className="order-2 lg:order-1">
              <div className="relative aspect-[4/5] photo-card">
                <Image
                  src="/photos/outdoor-statue.jpg"
                  alt="Heal Grow Thrive — group activity outdoors"
                  fill
                  className="object-cover img-warm"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </Reveal>

            {/* Schedule */}
            <Reveal className="order-1 lg:order-2" delay={0.1}>
              <span className="eyebrow mb-4">{t.schedule.eyebrow}</span>
              <h2 className="h2 mt-4 mb-3">{t.schedule.headline}</h2>
              <p className="text-ink-500 mb-8 leading-relaxed">
                {lang === 'en'
                  ? 'A structured day designed for predictability and progress. Every hour is intentional.'
                  : 'Un día estructurado diseñado para previsibilidad y progreso. Cada hora es intencional.'}
              </p>

              <ol className="space-y-1">
                {t.schedule.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-ink/[0.08] last:border-b-0"
                  >
                    <span className="flex-shrink-0 w-20 text-right font-semibold text-teal-700 text-sm tabular-nums">
                      {item.time}
                    </span>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-400" aria-hidden />
                    <span className="flex-1 text-ink text-[15px] font-medium">{item.title}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-8 font-serif italic text-lg text-teal-700">
                {t.schedule.footer}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── ACTIVITIES MOSAIC — field trips, holidays, community ───── */}
      <section className="section-tight bg-cream">
        <div className="container-wide">
          <Reveal className="text-center mb-12">
            <span className="eyebrow mb-3">
              {lang === 'en' ? 'A look inside the program' : 'Por dentro del programa'}
            </span>
            <h2 className="h2 mt-4 max-w-2xl mx-auto">
              {lang === 'en' ? (
                <>Where the <em>real growth</em> happens.</>
              ) : (
                <>Donde sucede el <em>crecimiento real</em>.</>
              )}
            </h2>
            <p className="body-lg max-w-xl mx-auto mt-5">
              {lang === 'en'
                ? 'Field trips, art workshops, cultural projects, holiday celebrations — every week is a new way to grow.'
                : 'Excursiones, talleres de arte, proyectos culturales, celebraciones — cada semana, una nueva forma de crecer.'}
            </p>
          </Reveal>

          {/* Row 1 — Wide hero + tall portrait */}
          <motion.div
            className="grid grid-cols-12 gap-4 sm:gap-5 mb-4 sm:mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-8 photo-card aspect-[16/10]"
            >
              <Image
                src="/photos/pumpkin-patch.jpg"
                alt="Fall field trip — pumpkin patch group photo"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 65vw"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur shadow-card-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  {lang === 'en' ? 'Field trips' : 'Excursiones'}
                </span>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-4 photo-card aspect-[16/10] sm:aspect-auto"
            >
              <Image
                src="/photos/holiday-party.jpg"
                alt="Holiday celebration — community party"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur shadow-card-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  {lang === 'en' ? 'Celebrations' : 'Celebraciones'}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Row 2 — 3-up activity tiles */}
          <motion.div
            className="grid grid-cols-12 gap-4 sm:gap-5 mb-4 sm:mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-4 photo-card aspect-[4/3]"
            >
              <Image
                src="/photos/wagon-ride.jpg"
                alt="Farm wagon ride field trip"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-4 photo-card aspect-[4/3]"
            >
              <Image
                src="/photos/workshop-fears.jpg"
                alt="Group workshop — facing fears"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-4 photo-card aspect-[4/3]"
            >
              <Image
                src="/photos/flower-arranging.jpg"
                alt="Flower arranging workshop"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </motion.div>
          </motion.div>

          {/* Row 3 — Beach + culture wide */}
          <motion.div
            className="grid grid-cols-12 gap-4 sm:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-5 photo-card aspect-[4/3]"
            >
              <Image
                src="/photos/culture-projects.jpg"
                alt="Cultural projects — Trust Love Forgiveness"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur shadow-card-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  {lang === 'en' ? 'Identity & values' : 'Identidad y valores'}
                </span>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-7 photo-card aspect-[16/9]"
            >
              <Image
                src="/photos/beach-portrait.jpg"
                alt="Beach field trip portrait"
                fill
                className="object-cover img-warm"
                sizes="(max-width: 640px) 100vw, 55vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="section bg-white" id="faq">
        <div className="container-default">
          <Reveal className="text-center mb-12">
            <span className="eyebrow mb-4">{t.faq.eyebrow}</span>
            <h2 className="h2 mt-4">{t.faq.headline}</h2>
          </Reveal>

          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {t.faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`rounded-card border transition-all duration-200 ${
                    isOpen
                      ? 'border-teal-300 bg-sage-50/50 shadow-card-sm'
                      : 'border-ink/10 bg-white hover:border-ink/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 flex items-center justify-between gap-4
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30 rounded-card"
                  >
                    <span className="font-semibold text-base sm:text-[17px] text-ink">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 w-7 h-7 rounded-full grid place-items-center ${
                        isOpen ? 'bg-teal-700 text-white' : 'bg-sage-100 text-teal-700'
                      }`}
                      aria-hidden
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-ink-500 leading-relaxed text-[15px]">
                      {item.a}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ───── FORM CTA ───── */}
      <section
        id="apply"
        className="section bg-gradient-to-b from-cream via-sage-50 to-cream relative overflow-hidden"
      >
        <div className="container-default relative">
          <Reveal className="text-center mb-10">
            <span className="eyebrow mb-4">{t.form.eyebrow}</span>
            <h2 className="h2 mt-4 mb-4">{t.form.headline}</h2>
            <p className="body-lg max-w-xl mx-auto">{t.form.subheadline}</p>
          </Reveal>

          <Reveal>
            <LeadForm lang={lang} id="lead-form" />
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-ink-400">
            {['AHCA-Accredited', 'Florida Medicaid Provider', 'Licensed Clinicians'].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {b}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <span className="text-yellow-500 text-[11px]">★★★★★</span>
              <span>Google reviewed</span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-ink text-white py-14">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-10 relative bg-white/5 rounded p-1">
                  <Image src="/logos/hgt-logo.png" alt="Heal Grow Thrive" fill className="object-contain" />
                </div>
                <div className="flex flex-col leading-[1.05]">
                  <span className="font-bold text-[15px]">Life Skills,</span>
                  <span className="font-bold text-[15px]">Summer Thrills</span>
                  <span className="text-[10px] font-medium text-white/50 tracking-wide uppercase mt-1">
                    {t.footer.poweredBy}
                  </span>
                </div>
              </div>
              <p className="text-white/60 text-[13px] leading-relaxed max-w-xs">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white text-sm uppercase tracking-wider">
                {lang === 'en' ? 'Winter Park' : 'Winter Park'}
              </h4>
              <p className="text-white/60 text-[13px] leading-relaxed">
                {t.footer.addressLine1}
                <br />
                {t.footer.addressLine2}
              </p>
              <p className="text-white/60 text-[13px] mt-2">{t.footer.datesLine}</p>
              <a
                href={`tel:${t.footer.phone.replace(/\D/g, '')}`}
                className="block text-white/60 text-[13px] hover:text-white py-1 mt-3 transition-colors"
              >
                {t.footer.phone}
              </a>
              <a
                href={`mailto:${t.footer.email}`}
                className="block text-white/60 text-[13px] hover:text-white py-1 transition-colors"
              >
                {t.footer.email}
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white text-sm uppercase tracking-wider">
                {lang === 'en' ? 'Quick Links' : 'Enlaces'}
              </h4>
              <a href="#program" className="block text-white/60 text-[13px] hover:text-white py-1 transition-colors">
                {lang === 'en' ? 'Program' : 'Programa'}
              </a>
              <a href="#how" className="block text-white/60 text-[13px] hover:text-white py-1 transition-colors">
                {lang === 'en' ? 'How it works' : 'Cómo funciona'}
              </a>
              <a href="#faq" className="block text-white/60 text-[13px] hover:text-white py-1 transition-colors">
                FAQ
              </a>
              <a href="#apply" className="block text-white/60 text-[13px] hover:text-white py-1 transition-colors">
                {lang === 'en' ? 'Apply' : 'Aplicar'}
              </a>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[12px] text-white/40">
            <span>{t.footer.copy}</span>
            <div className="flex items-center gap-2">
              <span className="opacity-70">{lang === 'en' ? 'In partnership with' : 'En alianza con'}</span>
              <Image
                src="/logos/thrive-blossom-logo.png"
                alt="Thrive and Blossom"
                width={50}
                height={50}
                className="h-7 w-auto"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* ───── STICKY MOBILE CTA ───── */}
      <motion.a
        href="#apply"
        animate={{
          opacity: showStickyCta ? 1 : 0,
          y: showStickyCta ? 0 : 20,
          pointerEvents: showStickyCta ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed bottom-4 right-4 z-40 btn-primary !py-3 !px-5 text-sm shadow-cta-hover"
      >
        {t.stickyMobile}
      </motion.a>
    </main>
  );
}
