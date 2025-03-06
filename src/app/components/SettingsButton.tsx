'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/SettingsButton.css';

const SettingsButton: React.FC = () => {
  const { setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState('medium');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.backgroundColor = darkMode ? 'var(--primary-color)' : 'var(--secondary-color)';
    document.body.style.color = darkMode ? 'var(--secondary-color)' : 'var(--primary-color)';
  }, []);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const changeTextSize = (size: string) => {
    setTextSize(size);
    document.documentElement.style.fontSize = `var(--text-${size})`;
  };

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '0') changeTextSize('small');
    else if (value === '1') changeTextSize('medium');
    else if (value === '2') changeTextSize('large');
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
    <div className="settings-container">
      <button className="settings-button" onClick={toggleSettings}>⚙️</button>
      {isOpen && (
        <div className="settings-menu">
          <div className="language-switcher">
            <button onClick={() => changeLanguage('de')}>🇩🇪</button>
            <button onClick={() => changeLanguage('en')}>🇬🇧</button>
            <button onClick={() => changeLanguage('es')}>🇪🇸</button>
            <button onClick={() => changeLanguage('it')}>🇮🇹</button>
            <button onClick={() => changeLanguage('fr')}>🇫🇷</button>
          </div>
          <div>
            <div className="text-size-slider-container">
              <span className="settings-emoji">🔎</span>
              <input
                type="range"
                min="0"
                max="2"
                value={textSize === 'small' ? '0' : textSize === 'medium' ? '1' : '2'}
                onChange={handleTextSizeChange}
                className="text-size-slider"
              />
            </div>
          </div>
          <div>
          <span className="settings-emoji">🥷</span>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
