import React, { useState, useEffect } from 'react';
import './App.css';

const NUM_PAIRS = 30; // Number of card pairs
const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍒', '🍓', '🍑', '🥝', '🥥']; // Card symbols

function App() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);

  useEffect(() => {
    const initialCards = [];
    for (let i = 0; i < NUM_PAIRS; i++) {
      initialCards.push({ symbol: symbols[i % symbols.length], id: i * 2 });
      initialCards.push({ symbol: symbols[i % symbols.length], id: i * 2 + 1 });
    }
    initialCards.sort(() => Math.random() - 0.5); // Shuffle the cards
    setCards(initialCards);
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || matchedIndices.includes(index)) return;

    setFlippedIndices([...flippedIndices, index]);

    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      if (cards[firstIndex].symbol === cards[index].symbol) {
        setMatchedIndices([...matchedIndices, firstIndex, index]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  };

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedIndices.includes(index) || matchedIndices.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedIndices.includes(index) || matchedIndices.includes(index) ? card.symbol : '?'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


