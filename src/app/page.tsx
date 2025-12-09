"use client";

import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { useLanguage } from './context/LanguageContext';
import { getTranslation } from './i18n/translations';
import SettingsButton from './components/SettingsButton';

const CardList: React.FC = () => {
  const { language } = useLanguage();
  const translation = getTranslation(language);
  const { cards, general: generalRules } = translation;

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
            <li key={index} dangerouslySetInnerHTML={{ __html: rule }} />
          ))}
        </ul>
      </div>
      <SettingsButton />
    </div>
  );
};

export default CardList;