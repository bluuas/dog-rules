'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { setLanguage } = useLanguage();
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFixed(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className={`language-switcher ${isFixed ? 'fixed' : 'static'}`}>
      <button onClick={() => changeLanguage('de')}>🇩🇪</button>
      <button onClick={() => changeLanguage('en')}>🇬🇧</button>
      <button onClick={() => changeLanguage('es')}>🇪🇸</button>
      <button onClick={() => changeLanguage('it')}>🇮🇹</button>
      <button onClick={() => changeLanguage('fr')}>🇫🇷</button>
    </div>
  );
};

export default LanguageSwitcher;
