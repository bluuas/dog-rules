import translations from '../i18n/translations';

const getLanguage = () => {
  return navigator.language.split('-')[0] || 'en';
};

const currentLanguage = getLanguage();

export const cards = translations[currentLanguage]?.cards || translations['en'].cards;