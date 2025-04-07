import React from 'react';

export const AnimalCard = ({ animal, onDragStart }) => {
  if (!animal.visible) return null;
  
  return (
    <div 
      className="w-32 h-32 rounded-lg overflow-hidden shadow-md cursor-move hover:scale-105 hover:shadow-lg transition-all relative bg-white"
      draggable={true}
      onDragStart={() => onDragStart(animal)}
    >
      <img 
        src={animal.image || "/api/placeholder/130/130"} 
        alt={animal.name}
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-1 text-center font-medium pointer-events-none">
        {animal.name}
      </div>
    </div>
  );
};