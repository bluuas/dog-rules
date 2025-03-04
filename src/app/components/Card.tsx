// src/app/components/Card.tsx
import React from 'react';

interface CardProps {
  name: string;
  displayed: string;
  emoji: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, displayed, emoji, description}) => {
  return (
    <div className="flex items-center p-4">
      <div className="relative w-20 h-30 bg-white bg-opacity-10 backdrop-blur-md rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
        <div className="absolute top-2 left-2 text-2xl font-bold text-black">{displayed}</div>
        <div className="text-4xl text-">{emoji}</div>
        <div className="absolute bottom-2 right-2 text-2xl font-bold text-black">{displayed}</div>
      </div>
      <div className="ml-4">
        <div className="text-2xl font-bold">{name}</div>
        <div className="mt-2">{description}</div>
      </div>
    </div>
  );
};

export default Card;