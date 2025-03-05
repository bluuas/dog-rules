"use client";

import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { useLanguage } from './context/LanguageContext';
import translations from './i18n/translations';
import LanguageSwitcher from './components/LanguageSwitcher';

const CardList: React.FC = () => {
  const { language } = useLanguage();
  const cards = translations[language]?.cards || translations['en'].cards;
  const generalRules = translations[language]?.general || translations['en'].general;

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
      <div className="mt-8 p-8">
        <h2 className="text-2xl font-bold p-4">{generalRules.title}</h2>
        <ul className="list-disc list-inside">
          {generalRules.description.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
      <LanguageSwitcher />
    </div>
  );
};

export default CardList;