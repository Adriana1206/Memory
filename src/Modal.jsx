import React from 'react';

function Modal({ result, onRestart }) {
  if (!result) return null;

  
  const getGifSrc = () => {
    if (result === 'Hai vinto!') {
      return '/win.gif'; 
    } else if (result === 'Hai perso!') {
      return '/lose.gif'; 
    }
    return '';
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center">
        <img
          src={getGifSrc()}
          alt={result}
          className="mb-4 w-32 h-32 object-cover" 
        />
        <h2 className="text-2xl font-bold mb-4">{result}</h2>
        <button
          className="bg-blue-800 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
          onClick={onRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default Modal;
