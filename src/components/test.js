import React, { useState } from 'react';

const Card = ({ number, handleDragStart, handleDrop, isDragging }) => {
  const drag = (e) => {
    e.dataTransfer.setData('text/plain', number);
    handleDragStart(number);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    const droppedNumber = parseInt(e.dataTransfer.getData('text/plain'));
    handleDrop(droppedNumber, number);
  };

  return (
    <div
      className={`card ${isDragging ? 'dragging' : ''}`}
      draggable={!isDragging}
      onDragStart={drag}
      onDragOver={allowDrop}
      onDrop={drop}
    >
      {number}
    </div>
  );
};

const Test = () => {
  const [cards, setCards] = useState([1, 2, 3, 4]);
  const [draggedCard, setDraggedCard] = useState(null);

  const handleDragStart = (number) => {
    setDraggedCard(number);
  };

  const handleDrop = (source, target) => {
    const newCards = cards.map((card) => {
      if (card === source) return target;
      if (card === target) return source;
      return card;
    });
    setCards(newCards);
    setDraggedCard(null);
  };

  return (
    <div className="app">
      <h1>Drag and Drop Example</h1>
      <div className="card-container">
        {cards.map((number) => (
          <Card
            key={number}
            number={number}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            isDragging={draggedCard === number}
          />
        ))}
      </div>
    </div>
  );
};

export default Test;
