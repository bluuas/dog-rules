"use client";

import React, { useState, useEffect, useCallback } from 'react';
import CardPopup from './CardPopup';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation, interpolate } from '../i18n/translations';

interface CardProps {
  name: string;
  letter: string;
  emoji: string;
  description: string[];
  detailed_description: string[];
}

const Card: React.FC<CardProps> = ({ name, letter, emoji, description, detailed_description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const { ui } = getTranslation(language);

  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closeModal]);

  return (
    <>
      {/*
        The whole row stays clickable for pointer users, but only the card face is a button.
        A button's children are hidden from screen readers, so making the whole row a button
        would have swallowed the rules next to it.
      */}
      <article className="flex items-center p-4 cursor-pointer" onClick={openModal}>
        <h2 className="sr-only">{name}</h2>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
          aria-label={interpolate(ui.viewDetails, { name })}
          className="relative min-w-20 min-h-30 aspect-w-1 aspect-h-1 bg-white bg-opacity-10 backdrop-blur-md rounded-lg border border-gray-300 shadow-lg flex items-center justify-center cursor-pointer"
        >
          <span className="absolute top-2 left-2 text-2xl font-bold text-black">{letter}</span>
          <span className="text-4xl text-black">{emoji}</span>
          <span className="absolute bottom-2 right-2 text-2xl font-bold text-black">{letter}</span>
        </button>
        <div className="ml-4">
          <ul className="list-disc list-inside">
            {description.map((desc, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: desc }} />
            ))}
          </ul>
        </div>
      </article>

      {isModalOpen && (
        <CardPopup card={{ name, letter, emoji, description, detailed_description }} onClose={closeModal} />
      )}
    </>
  );
};

export default React.memo(Card);
