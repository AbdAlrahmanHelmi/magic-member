import { useState, useEffect } from "react";

import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImage = [
  { src: "../img/shield-1.png", matched: false },
  { src: "../img/helmet-1.png", matched: false },
  { src: "../img/potion-1.png", matched: false },
  { src: "../img/ring-1.png", matched: false },
  { src: "../img/scroll-1.png", matched: false },
  { src: "../img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiceOne] = useState(null);
  const [choiseTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState();

  const shuffleCards = () => {
    const shuffleCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiseOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiseOne.src) {
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
  }, [choiseOne, choiseTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  const result = cards.every((card) => card.matched === true);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
            result={result}
          />
        ))}
      </div>
      {result && (
        <div className="ahmad">
          <h1>Programming by:abd-Alrahman Helmi</h1>
          <h2>thanks Ahmad Jawabra for supported</h2>
        </div>
      )}
      <p>turns :{turns}</p>
    </div>
  );
}

export default App;
