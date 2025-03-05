import React from 'react';
import '../styles/CardPopup.css';

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

const CardPopup: React.FC<CardPopupProps> = ({ card, onClose }) => {
  return (
    <div className="popup" onClick={onClose}>
      <div className="popup-content text-black text-left" onClick={(e) => e.stopPropagation()}>
        <div className="text-4xl text-black font-bold text-left">{card.emoji}{card.letter}</div>
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
