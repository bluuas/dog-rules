import translations from '../i18n/translations';

const getLanguage = () => {
  // Logic to get the current language, e.g., from cookies or local storage
  return "de"; // Default to German
};

const currentLanguage = getLanguage();

export const cards = translations[currentLanguage].cards;