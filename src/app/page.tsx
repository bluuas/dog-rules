"use client";

import React from 'react';
import Card from './components/Card';
import ReadAloudButton from './components/ReadAloudButton';
import SettingsButton from './components/SettingsButton';
import { useLanguage } from './context/LanguageContext';
import { getTranslation } from './i18n/translations';
import { cardEmojiNames } from './lib/speech';

const CardList: React.FC = () => {
  const { language } = useLanguage();
  const translation = getTranslation(language);
  const { cards, general: generalRules, ui } = translation;

  return (
    <div>
      <h1 className="sr-only">{translation.title}</h1>
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
        <div className="flex items-center gap-2 p-4">
          <h2 className="text-2xl font-bold">{generalRules.title}</h2>
          <ReadAloudButton
            segments={[generalRules.title, ...generalRules.description]}
            language={language}
            emojiNames={cardEmojiNames(cards)}
            label={ui.readAloud}
            stopLabel={ui.stopReading}
          />
        </div>
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
