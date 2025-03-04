import translations from '../i18n/translations';
import { Translations } from '../i18n/translations';

const getLanguage = () => {
  return navigator.language.split('-')[0] || 'en';
};

const currentLanguage = getLanguage();

export const cards = (translations as Translations)[currentLanguage]?.cards || translations['en'].cards;