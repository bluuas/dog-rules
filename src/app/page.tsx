// src/app/page.tsx
import React from 'react';
import CardList from './components/CardList';
import Card from './components/Card';
import { cards } from './data/cards';

export default function Home() {
  return (
    <div className="flex">
      {/* <CardList cards={cards} /> */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Dog Rules</h1>
        {cards.map((card) => (
          <Card 
            key={card.name} 
            name={card.name} 
            displayed={card.displayed} 
            emoji={card.emoji} 
            description={card.description} 
          />
        ))}
      </div>
    </div>
  );
}