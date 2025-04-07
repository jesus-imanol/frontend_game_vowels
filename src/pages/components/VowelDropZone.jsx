import React, { useState } from 'react';

// Colores de fondo para cada vocal
const vowelColors = {
  a: 'bg-gradient-to-br from-red-400 to-red-300',
  e: 'bg-gradient-to-br from-blue-400 to-blue-300', 
  i: 'bg-gradient-to-br from-green-400 to-green-300',
  o: 'bg-gradient-to-br from-yellow-400 to-yellow-300',
  u: 'bg-gradient-to-br from-purple-600 to-purple-400'
};

export const VowelDropZone = ({ vowel, count, onDrop, placedAnimals = [] }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHighlighted(true);
  };
  
  const handleDragLeave = () => {
    setIsHighlighted(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsHighlighted(false);
    onDrop();
  };
  
  return (
    <div 
      className={`w-36 h-36 rounded-full flex justify-center items-center text-5xl font-bold text-white ${vowelColors[vowel]} shadow-md relative transition-all ${isHighlighted ? 'shadow-lg shadow-purple-300' : ''}`}
    >
      {/* Zona de soltar */}
      <div 
        className="absolute inset-0 rounded-full z-10"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      ></div>
      
      {/* Letra de la vocal */}
      <span className="uppercase">{vowel}</span>
      
      {/* Contador de animales */}
      <div className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center text-base font-bold shadow-md">
        {count}
      </div>
      
      {/* Miniaturas de animales colocados */}
      {placedAnimals.map((animal, index) => {
        // Posicionar las miniaturas alrededor del círculo
        const angle = index * 72; // 360 / 5 = 72 grados
        const radius = 55;
        const x = radius * Math.cos(angle * Math.PI / 180);
        const y = radius * Math.sin(angle * Math.PI / 180);
        
        const borderColor = animal.starting_vowel === vowel ? 'border-green-400' : 'border-red-500';
        
        return (
          <div 
            key={animal.id}
            className={`absolute w-10 h-10 bg-cover rounded-full border-2 ${borderColor} shadow-md`}
            style={{
              backgroundImage: `url(${animal.image || "/api/placeholder/40/40"})`,
              transform: `translate(${x}px, ${y}px)`
            }}
          ></div>
        );
      })}
    </div>
  );
};