'use client';

import { useState } from 'react';
import { translations, type Lang } from '@/lib/translations';
import { getStoredUtm } from '@/lib/utm';

declare global { interface Window { fbq?: (...args: any[]) => void } }

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'age' | 'medicaid', string>>;

const validatePhone = (p: string) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(p.replace(/\s/g, ''));
const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function LeadForm({ lang, id }: { lang: Lang; id?: string }) {
  const t = translations[lang].form;
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ name: string; phone: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    medicaid: '',
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = t.errors.name;
    if (!form.phone.trim() || !validatePhone(form.phone)) e.phone = t.errors.phone;
    if (!form.email.trim() || !validateEmail(form.email)) e.email = t.errors.email;
    const age = parseInt(form.age, 10);
    if (isNaN(age) || age < 5 || age > 17) e.age = t.errors.age;
    if (!form.medicaid) e.medicaid = t.errors.medicaid;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const utm = getStoredUtm();
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      const payload = {
        ...form,
        ...utm,
        language: lang,
        submitted_at: new Date().toISOString(),
        source: 'Life Skills Summer Thrills — Winter Park Landing',
      };
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('submit_failed');
      } else {
        console.warn('[Life Skills Lead] No webhook configured. Payload:', payload);
      }

      // Trigger Meta Pixel Lead event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Life Skills Summer Thrills — Winter Park',
          content_category: 'Mental Health Summer Program',
        });
      }

      setSuccess({ name: form.name.split(' ')[0], phone: form.phone });
    } catch {
      setSubmitError(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        id={id}
        className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-sage scroll-mt-24"
      >
        <div className="w-14 h-14 bg-teal/10 rounded-full grid place-items-center mb-5 mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="#2C9B8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="h3 text-center mb-3">
          {t.success.title.replace('{name}', success.name)}
        </h3>
        <p className="text-center text-charcoal-light">
          {t.success.body
            .replace('{name}', success.name)
            .replace('{phone}', success.phone)}
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sage scroll-mt-24"
      aria-label="Eligibility application form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Name (full width on mobile, 2/2 on desktop) */}
        <div className="sm:col-span-2">
          <label htmlFor="lf-name" className="block text-sm font-semibold mb-1.5">
            {t.labels.name}
          </label>
          <input
            id="lf-name"
            type="text"
            autoComplete="name"
            placeholder={t.placeholders.name}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'lf-name-err' : undefined}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-teal/30 ${
              errors.name ? 'border-coral' : 'border-sage-dark'
            }`}
          />
          {errors.name && (
            <p id="lf-name-err" className="text-coral text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lf-phone" className="block text-sm font-semibold mb-1.5">
            {t.labels.phone}
          </label>
          <input
            id="lf-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t.placeholders.phone}
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={!!errors.phone}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal/30 ${
              errors.phone ? 'border-coral' : 'border-sage-dark'
            }`}
          />
          {errors.phone && <p className="text-coral text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lf-email" className="block text-sm font-semibold mb-1.5">
            {t.labels.email}
          </label>
          <input
            id="lf-email"
            type="email"
            autoComplete="email"
            placeholder={t.placeholders.email}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal/30 ${
              errors.email ? 'border-coral' : 'border-sage-dark'
            }`}
          />
          {errors.email && <p className="text-coral text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lf-age" className="block text-sm font-semibold mb-1.5">
            {t.labels.age}
          </label>
          <input
            id="lf-age"
            type="number"
            min={5}
            max={17}
            placeholder={t.placeholders.age}
            value={form.age}
            onChange={(e) => update('age', e.target.value)}
            aria-invalid={!!errors.age}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal/30 ${
              errors.age ? 'border-coral' : 'border-sage-dark'
            }`}
          />
          {errors.age && <p className="text-coral text-sm mt-1">{errors.age}</p>}
        </div>

        <div>
          <label htmlFor="lf-medicaid" className="block text-sm font-semibold mb-1.5">
            {t.labels.medicaid}
          </label>
          <select
            id="lf-medicaid"
            value={form.medicaid}
            onChange={(e) => update('medicaid', e.target.value)}
            aria-invalid={!!errors.medicaid}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal/30 ${
              errors.medicaid ? 'border-coral' : 'border-sage-dark'
            }`}
          >
            <option value="">—</option>
            <option value="yes">{t.medicaidOptions.yes}</option>
            <option value="no">{t.medicaidOptions.no}</option>
            <option value="unsure">{t.medicaidOptions.unsure}</option>
          </select>
          {errors.medicaid && <p className="text-coral text-sm mt-1">{errors.medicaid}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? t.submitting : t.submit}
      </button>

      {submitError && (
        <p role="alert" className="text-coral text-sm text-center mt-3">
          {submitError}
        </p>
      )}

      <p className="text-xs text-charcoal/60 text-center mt-3">{t.privacy}</p>
    </form>
  );
}
