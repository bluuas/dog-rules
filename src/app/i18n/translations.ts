import { DEFAULT_LANGUAGE } from '../config/languages';
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

/**
 * Labels for controls that are not visible as text (icon buttons, sliders, dialog titles).
 * Screen readers announce these, so they must follow the selected language.
 * `{name}` and `{language}` placeholders are filled in with `interpolate()`.
 */
export interface UIStrings {
  viewDetails: string;
  close: string;
  settings: string;
  language: string;
  switchTo: string;
  textSize: string;
  textSizeSmall: string;
  textSizeMedium: string;
  textSizeLarge: string;
  darkMode: string;
  readAloud: string;
  stopReading: string;
}

interface LanguageData {
  title: string;
  cards: {
    [id: string]: CardTranslation;
  };
  general: {
    title: string;
    description: string[];
  };
  ui?: Partial<UIStrings>;
}

export interface Translation {
  title: string;
  cards: Card[];
  general: {
    title: string;
    description: string[];
  };
  ui: UIStrings;
}

export interface Translations {
  [key: string]: Translation;
}

// English is the fallback for any UI string a language file leaves out.
const defaultUI: UIStrings = enTranslations.ui;

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
    cards,
    general: langData.general,
    ui: { ...defaultUI, ...langData.ui },
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
 * Fill `{placeholder}` tokens in a UI string, e.g. interpolate("Switch to {language}", { language: "Deutsch" }).
 * Unknown placeholders are left as they are.
 */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export default translations;
