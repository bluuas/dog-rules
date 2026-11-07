"use client";

import React, { useEffect, useRef } from 'react';
import '../styles/CardPopup.css';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../i18n/translations';
import { cardEmojiNames } from '../lib/speech';
import ReadAloudButton from './ReadAloudButton';

interface CardPopupProps {
  card: {
    name: string;
    letter: string;
    emoji: string;
    description: string[];
    detailed_description: string[];
  };
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const CardPopup: React.FC<CardPopupProps> = ({ card, onClose }) => {
  const { language } = useLanguage();
  const translation = getTranslation(language);
  const { ui } = translation;
  const dialogRef = useRef<HTMLDivElement>(null);

  // Move focus into the dialog, keep Tab cycling inside it, and hand focus back to the opener on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement as HTMLElement | null;
    dialog?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => {
      document.removeEventListener('keydown', trapFocus);
      opener?.focus();
    };
  }, []);

  return (
    <div className="popup" onClick={onClose}>
      <div
        ref={dialogRef}
        className="popup-content text-black text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <ReadAloudButton
          className="popup-speak"
          segments={[card.name, ...card.description, ...card.detailed_description]}
          language={language}
          emojiNames={cardEmojiNames(translation.cards)}
          label={ui.readAloud}
          stopLabel={ui.stopReading}
        />
        <button type="button" onClick={onClose} className="popup-close" aria-label={ui.close}>
          ✕
        </button>
        {/* Sighted users see suit and letter; screen readers get the card's name instead of "black spade suit Q". */}
        <h2 id="card-title" className="text-4xl text-black font-bold text-left">
          <span aria-hidden="true">{card.emoji}{card.letter}</span>
          <span className="sr-only">{card.name}</span>
        </h2>
        <ul className="list-disc list-inside text-left">
          {card.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
        <ul className="list-plus list-inside text-left">
          {card.detailed_description.map((detailedDesc, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: detailedDesc }} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPopup;
