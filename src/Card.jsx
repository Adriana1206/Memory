import React from 'react';

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div
      className="card relative w-32 h-[150px] perspective-1000 cursor-pointer" 
      onClick={handleClick}
      
    >
      <div
        className={`relative w-full h-full transform transition-transform duration-500 ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d', boxShadow: 'rgba(0, 0, 0, 0.64) 0px 3px 8px'} } 
      >
        <img
          className="absolute w-full h-full rounded-md backface-hidden"
          src="/cover.jpg"
          alt="card back"
          style={{ transform: 'rotateY(0deg)' }}
        />
        <img
          className="absolute w-full h-full rounded-md backface-hidden"
          src={card.src}
          alt="card front"
          style={{ transform: 'rotateY(180deg)' }}
        />
      </div>
    </div>
  );
}

export default Card;
