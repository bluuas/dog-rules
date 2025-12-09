export const SUPPORTED_LANGUAGES = ['de', 'en', 'es', 'it', 'fr'] as const;
export const DEFAULT_LANGUAGE = 'en';

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  fr: 'Français',
};

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
  es: '🇪🇸',
  it: '🇮🇹',
  fr: '🇫🇷',
};

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function getValidLanguage(lang: string | null | undefined): SupportedLanguage {
  if (!lang) return DEFAULT_LANGUAGE;
  const normalized = lang.toLowerCase().split('-')[0];
  return isSupportedLanguage(normalized) ? normalized : DEFAULT_LANGUAGE;
}
