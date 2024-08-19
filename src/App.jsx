import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Modal from './Modal';

const cardImages = [
  { src: '/Doryy.jpg', matched: false },
  { src: '/Flynn.jpg', matched: false },
  { src: '/Nemo.jpg', matched: false },
  { src: '/stella.jpg', matched: false },
  { src: '/pellicano.jpg', matched: false },
  { src: '/squalo.jpg', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      if (cards.every((card) => card.matched)) {
        setResult('Hai vinto!');
        setGameStarted(false);
      } else if (timer >= 30) {
        setResult('Hai perso!');
        setGameStarted(false);
      }
    }
  }, [cards, timer, gameStarted]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setGameStarted(true);
    setTimer(0);
    setResult(null);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  return (
    <>
      <div className="App flex flex-col items-center justify-center min-h-screen bg-blue-200 p-4 md:p-8">
        <h1 className="bungee-tint-regular text-2xl sm:text-3xl md:text-4xl mb-1">MEMORY</h1>
        <div className="text-lg font-bold mb-4">
          Tempo trascorso: {timer} secondi
        </div>
        <div className="card-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          onClick={shuffleCards}
          className="bg-blue-800 text-white px-4 sm:px-6 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300 m-2 sm:m-4"
        >
          New Game
        </button>
      </div>
      <Modal
        result={result}
        onRestart={() => {
          shuffleCards();
          setResult(null);
        }}
      />
    </>
  );
}

export default App;
