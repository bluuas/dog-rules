import { SupportedLanguage } from '../config/languages';
import type { Card } from '../i18n/translations';

/**
 * Voice locales to try per language, most preferred first.
 * Any voice whose language matches is accepted as a fallback.
 */
const PREFERRED_LOCALES: Record<SupportedLanguage, string[]> = {
  de: ['de-CH', 'de-DE'],
  en: ['en-GB', 'en-US'],
  es: ['es-ES'],
  it: ['it-IT'],
  fr: ['fr-CH', 'fr-FR'],
  sv: ['sv-SE'],
};

/** Locale to request when no concrete voice could be chosen. */
export function speechLocale(language: SupportedLanguage): string {
  return PREFERRED_LOCALES[language][0];
}

// Android reports voice languages as "de_DE", other platforms as "de-DE".
const normalizeTag = (tag: string) => tag.replace('_', '-').toLowerCase();

/** Pick the best installed voice for a language, or null when the device has none. */
export function pickVoice(
  voices: SpeechSynthesisVoice[],
  language: SupportedLanguage,
): SpeechSynthesisVoice | null {
  const candidates = voices.filter(voice => normalizeTag(voice.lang).split('-')[0] === language);
  if (candidates.length === 0) return null;

  for (const locale of PREFERRED_LOCALES[language]) {
    const match = candidates.find(voice => normalizeTag(voice.lang) === locale.toLowerCase());
    if (match) return match;
  }
  return candidates.find(voice => voice.default) ?? candidates[0];
}

/**
 * An emoji that stands for exactly one card (🃏 for the Joker) is spoken as that card's name.
 * Emoji shared by several cards (the suit) carry no information and are dropped instead.
 */
export function cardEmojiNames(cards: Card[]): Record<string, string> {
  const cardsByEmoji = new Map<string, Card[]>();
  for (const card of cards) {
    cardsByEmoji.set(card.emoji, [...(cardsByEmoji.get(card.emoji) ?? []), card]);
  }

  const names: Record<string, string> = {};
  for (const [emoji, owners] of cardsByEmoji) {
    if (owners.length === 1) names[emoji] = owners[0].name;
  }
  return names;
}

// Emoji plus the invisible modifiers that travel with them (variation selector, zero-width joiner).
// Built from a string because the ES2017 compiler target rejects the Unicode property escape in a literal.
const PICTOGRAPHS = new RegExp('[\\p{Extended_Pictographic}\\u{FE0F}\\u{200D}]', 'gu');
// Brackets left empty once their emoji are gone, e.g. "(↪️/↩️)" becomes "(/)".
const EMPTY_BRACKETS = /[(\[]\s*[\/,;|-]*\s*[)\]]/g;

/** Turn a rule string, which may contain HTML and emoji, into text that reads well when spoken. */
export function toSpeechText(rule: string, emojiNames: Record<string, string> = {}): string {
  let text = rule;
  for (const [emoji, name] of Object.entries(emojiNames)) {
    text = text.split(emoji).join(name);
  }

  text = stripHtml(text)
    // Speak URLs without protocol or trailing slash: "www.braendi-dog.de" instead of "https colon slash slash ...".
    .replace(/https?:\/\/(\S+?)\/?(?=\s|$)/g, '$1')
    .replace(PICTOGRAPHS, '')
    .replace(EMPTY_BRACKETS, '')
    .replace(/\s+/g, ' ')
    .trim();

  // End every rule like a sentence so the voice pauses and drops its pitch between rules.
  if (text && !/[.!?:]$/.test(text)) text += '.';
  return text;
}

function stripHtml(html: string): string {
  if (typeof DOMParser !== 'undefined') {
    return new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';
  }
  return html.replace(/<[^>]*>/g, '');
}
