// src/app/page.tsx
import React from 'react';
import CardList from './components/CardList';
import { cards } from './data/cards';

export default function Home() {
  return (
    <div className="flex">
      <CardList cards={cards} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Card Game Rules</h1>
        <p>Select a card from the list to see its description.</p>
      </div>
    </div>
  );
}