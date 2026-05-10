/**
 * UTM parameter capture and storage
 * Captures from URL on page load, persists in sessionStorage
 */

export type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
};

const STORAGE_KEY = 'hgt_utm_data';

export function captureUtmFromUrl(): UtmData {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
    fbclid: params.get('fbclid') || undefined,
    gclid: params.get('gclid') || undefined,
    referrer: document.referrer || undefined,
    landing_page: window.location.href,
  };

  // Only persist if any utm-style param exists
  const hasAny = Object.values(data).some((v) => v && v !== window.location.href);
  if (hasAny) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }

  return data;
}

export function getStoredUtm(): UtmData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : {};
  } catch {
    return {};
  }
}
