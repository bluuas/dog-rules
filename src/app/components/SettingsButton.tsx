'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_FLAGS, LANGUAGE_NAMES, SupportedLanguage } from '../config/languages';
import { getTranslation, interpolate } from '../i18n/translations';
import '../styles/SettingsButton.css';

const TEXT_SIZES = ['small', 'medium', 'large'] as const;
type TextSize = typeof TEXT_SIZES[number];

const isTextSize = (value: string | null): value is TextSize =>
  TEXT_SIZES.includes(value as TextSize);

const SettingsButton: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { ui } = getTranslation(language);
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const textSizeLabels: Record<TextSize, string> = {
    small: ui.textSizeSmall,
    medium: ui.textSizeMedium,
    large: ui.textSizeLarge,
  };

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.backgroundColor = darkMode ? 'var(--primary-color)' : 'var(--secondary-color)';
    document.body.style.color = darkMode ? 'var(--secondary-color)' : 'var(--primary-color)';
    
    // Load saved text size
    const savedTextSize = localStorage.getItem('textSize');
    const initialTextSize = isTextSize(savedTextSize) ? savedTextSize : 'medium';
    setTextSize(initialTextSize);
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    if (initialTextSize !== 'medium') {
      document.documentElement.classList.add(`text-${initialTextSize}`);
    }
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

  const changeTextSize = (size: TextSize) => {
    setTextSize(size);
    // Remove all text size classes first
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    // Add the new text size class
    if (size !== 'medium') {
      document.documentElement.classList.add(`text-${size}`);
    }
    localStorage.setItem('textSize', size);
  };

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTextSize(TEXT_SIZES[parseInt(event.target.value)]);
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
        aria-label={ui.settings}
        aria-expanded={isOpen}
      >
        {isOpen ? '✖' : '⚙️'}
      </button>
      {isOpen && (
        <div className={`settings-menu ${isDarkMode ? 'dark' : ''}`}>
          <div className="language-switcher" role="group" aria-label={ui.language}>
            {SUPPORTED_LANGUAGES.map(lang => (
              <button 
                key={lang} 
                type="button"
                onClick={() => changeLanguage(lang)}
                aria-label={interpolate(ui.switchTo, { language: LANGUAGE_NAMES[lang] })}
                aria-pressed={language === lang}
                title={LANGUAGE_NAMES[lang]}
                className={language === lang ? 'active' : ''}
              >
                {LANGUAGE_FLAGS[lang]}
              </button>
            ))}
          </div>
          <div className="text-size-slider-container">
            {/* Decorative: the control next to it carries the label. */}
            <span className="settings-emoji" aria-hidden="true">🔎</span>
            <input
              type="range"
              min="0"
              max="2"
              value={TEXT_SIZES.indexOf(textSize).toString()}
              onChange={handleTextSizeChange}
              className="text-size-slider"
              aria-label={ui.textSize}
              aria-valuetext={textSizeLabels[textSize]}
            />
          </div>
          <div>
            <span className="settings-emoji" aria-hidden="true">🥷</span>
            <label className="switch">
              <input 
                type="checkbox" 
                role="switch"
                checked={isDarkMode} 
                onChange={toggleDarkMode}
                aria-label={ui.darkMode}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
