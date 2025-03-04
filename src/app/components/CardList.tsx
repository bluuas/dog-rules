// src/app/components/CardList.tsx
import React from 'react';

interface CardListProps {
  cards: { name: string }[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="sticky top-0 p-4 bg-gray-100 h-screen overflow-y-auto">
      <ul>
        {cards.map((card) => (
          <li key={card.name} className="mb-2">
            <span className="text-blue-500">{card.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;