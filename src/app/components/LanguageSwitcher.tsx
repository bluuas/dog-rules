'use client';

import React from 'react';

const LanguageSwitcher: React.FC = () => {
  const changeLanguage = (lang: string) => {
    // Logic to change the language, e.g., update cookies or local storage
    window.location.reload(); // Reload to apply changes
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
