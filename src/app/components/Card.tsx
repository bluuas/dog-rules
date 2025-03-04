"use client";

import React, { useState } from 'react';
import CardPopup from './CardPopup';

interface CardProps {
  name: string;
  letter: string;
  emoji: string;
  description: string[];
  detailed_description: string[];
}

const Card: React.FC<CardProps> = ({ name, letter, emoji, description, detailed_description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex items-center p-4" onClick={handleCardClick}>
        <div className="relative min-w-20 min-h-30 aspect-w-1 aspect-h-1 bg-white bg-opacity-10 backdrop-blur-md rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
          <div className="absolute top-2 left-2 text-2xl font-bold text-black">{letter}</div>
          <div className="text-4xl text-black">{emoji}</div>
          <div className="absolute bottom-2 right-2 text-2xl font-bold text-black">{letter}</div>
        </div>
        <div className="ml-4">
          <ul className="list-disc list-inside">
            {description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center z-50" onClick={handleCardClick}>
          <CardPopup card={{ name, letter, emoji, description, detailed_description }} onClose={handleCardClick} />
        </div>
      )}
    </>
  );
};

export default Card;