'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { setLanguage } = useLanguage();

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className="bottom-4 w-full flex justify-center space-x-4 text-xl">
      <button onClick={() => changeLanguage('de')}>🇩🇪</button>
      <button onClick={() => changeLanguage('en')}>🇬🇧</button>
      <button onClick={() => changeLanguage('es')}>🇪🇸</button>
      <button onClick={() => changeLanguage('it')}>🇮🇹</button>
      <button onClick={() => changeLanguage('fr')}>🇫🇷</button>
    </div>
  );
};

export default LanguageSwitcher;
