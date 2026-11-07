"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getValidLanguage, SupportedLanguage, DEFAULT_LANGUAGE } from '../config/languages';

interface LanguageContextProps {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const STORAGE_KEY = 'dog-rules-language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Priority: URL param > localStorage > browser language > default
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang');
    const storedLang = localStorage.getItem(STORAGE_KEY);
    const browserLang = navigator.language.split('-')[0];
    
    const lang = getValidLanguage(queryLang || storedLang || browserLang);
    setLanguageState(lang);
  }, []);

  // Screen readers choose their pronunciation from the document language,
  // so it has to follow the selected language rather than stay at the static "en".
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
    localStorage.setItem(STORAGE_KEY, newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
