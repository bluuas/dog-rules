"use client";

import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { useLanguage } from './context/LanguageContext';
import translations from './i18n/translations';
import LanguageSwitcher from './components/LanguageSwitcher';

const CardList: React.FC = () => {
  const { language } = useLanguage();
  const cards = translations[language]?.cards || translations['en'].cards;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <Card
            key={card.id}
            name={card.name}
            letter={card.letter}
            emoji={card.emoji}
            description={card.description}
            detailed_description={card.detailed_description}
          />
        ))}
      </div>
      <LanguageSwitcher />
    </div>
  );
};

export default CardList;