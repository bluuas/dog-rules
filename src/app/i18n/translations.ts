import { SupportedLanguage, DEFAULT_LANGUAGE } from '../config/languages';
import deTranslations from './locales/de.json';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';
import frTranslations from './locales/fr.json';

interface Card {
  id: number;
  name: string;
  letter: string;
  emoji: string;
  description: string[];
  detailed_description: string[];
}

export interface Translation {
  title: string;
  description: string;
  cards: Card[];
  general: {
    title: string;
    description: string[];
  };
}

export interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  de: deTranslations,
  en: enTranslations,
  es: esTranslations,
  it: itTranslations,
  fr: frTranslations,
};

/**
 * Get translation for a specific language with fallback to default
 */
export function getTranslation(language: string): Translation {
  return translations[language] ?? translations[DEFAULT_LANGUAGE];
}

/**
 * Check if a language has translations available
 */
export function hasTranslation(language: string): boolean {
  return language in translations;
}

export default translations;
