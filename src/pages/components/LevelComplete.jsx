import React from 'react';

export const LevelComplete = ({ onNextLevel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate__animated animate__fadeIn">
      <div className="bg-white rounded-lg p-10 text-center max-w-lg animate__animated animate__bounceIn">
        <h2 className="text-3xl font-bold mb-5">¡Nivel Completado!</h2>
        
        <div className="w-48 h-48 mx-auto mb-5">
          <img 
            src="/api/placeholder/200/200" 
            alt="Premio" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <p className="text-lg mb-6">Has completado este nivel con éxito. ¡Felicidades!</p>
        
        <button 
          className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-3 rounded-full text-lg font-medium"
          onClick={onNextLevel}
        >
          Siguiente Nivel
        </button>
      </div>
    </div>
  );
};