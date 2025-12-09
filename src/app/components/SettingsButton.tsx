'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_FLAGS, LANGUAGE_NAMES, SupportedLanguage } from '../config/languages';
import '../styles/SettingsButton.css';

const SettingsButton: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState('medium');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.backgroundColor = darkMode ? 'var(--primary-color)' : 'var(--secondary-color)';
    document.body.style.color = darkMode ? 'var(--secondary-color)' : 'var(--primary-color)';
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleSettings = () => setIsOpen(!isOpen);

  const changeLanguage = (lang: SupportedLanguage) => setLanguage(lang);

  const changeTextSize = (size: string) => {
    setTextSize(size);
    document.documentElement.style.fontSize = `var(--text-${size})`;
  };

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sizes = ['small', 'medium', 'large'];
    changeTextSize(sizes[parseInt(event.target.value)]);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    document.body.style.backgroundColor = newDarkMode ? 'var(--primary-color)' : 'var(--secondary-color)';
    document.body.style.color = newDarkMode ? 'var(--secondary-color)' : 'var(--primary-color)';
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <div className="settings-container" ref={settingsRef}>
      <button 
        className={`settings-button ${isOpen ? 'rotate' : ''}`} 
        onClick={toggleSettings}
        aria-label="Settings"
        aria-expanded={isOpen}
      >
        {isOpen ? '✖' : '⚙️'}
      </button>
      {isOpen && (
        <>
          <div className={`settings-menu ${isDarkMode ? 'dark' : ''}`}>
            <div className="language-switcher">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button 
                  key={lang} 
                  onClick={() => changeLanguage(lang)}
                  aria-label={`Switch to ${LANGUAGE_NAMES[lang]}`}
                  title={LANGUAGE_NAMES[lang]}
                  className={language === lang ? 'active' : ''}
                >
                  {LANGUAGE_FLAGS[lang]}
                </button>
              ))}
            </div>
            <div className="text-size-slider-container">
              <span className="settings-emoji" aria-label="Text size">🔎</span>
              <input
                type="range"
                min="0"
                max="2"
                value={['small', 'medium', 'large'].indexOf(textSize).toString()}
                onChange={handleTextSizeChange}
                className="text-size-slider"
                aria-label="Adjust text size"
              />
            </div>
            <div>
              <span className="settings-emoji" aria-label="Dark mode">🥷</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={isDarkMode} 
                  onChange={toggleDarkMode}
                  aria-label="Toggle dark mode"
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsButton;
