import { SupportedLanguage, DEFAULT_LANGUAGE } from '../config/languages';
import cardMetadata from './card-metadata.json';
import deTranslations from './locales/de.json';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';
import frTranslations from './locales/fr.json';
import svTranslations from './locales/sv.json';

interface CardMetadata {
  id: number;
  letter: string;
  emoji: string;
}

interface CardTranslation {
  name: string;
  description: string[];
  detailed_description: string[];
}

export interface Card {
  id: number;
  name: string;
  letter: string;
  emoji: string;
  description: string[];
  detailed_description: string[];
}

interface LanguageData {
  title: string;
  description: string;
  cards: {
    [id: string]: CardTranslation;
  };
  general: {
    title: string;
    description: string[];
  };
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

/**
 * Merge card metadata with translations
 */
function mergeCardsWithMetadata(langData: LanguageData): Translation {
  const cards: Card[] = cardMetadata.map((meta: CardMetadata) => {
    const translation = langData.cards[meta.id.toString()];
    return {
      id: meta.id,
      letter: meta.letter,
      emoji: meta.emoji,
      name: translation?.name || '',
      description: translation?.description || [],
      detailed_description: translation?.detailed_description || [],
    };
  });

  return {
    title: langData.title,
    description: langData.description,
    cards,
    general: langData.general,
  };
}

const translations: Translations = {
  de: mergeCardsWithMetadata(deTranslations as LanguageData),
  en: mergeCardsWithMetadata(enTranslations as LanguageData),
  es: mergeCardsWithMetadata(esTranslations as LanguageData),
  it: mergeCardsWithMetadata(itTranslations as LanguageData),
  fr: mergeCardsWithMetadata(frTranslations as LanguageData),
  sv: mergeCardsWithMetadata(svTranslations as LanguageData),
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
