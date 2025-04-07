import React from 'react';

export const UIInfoSection = () => {
  const principles = [
    'Alto contraste',
    'Claridad visual',
    'Consistencia',
    'Formato cuadrado',
    'Fondo neutro',
    'Iluminación uniforme',
    'Sujeto centrado',
    'Colores vibrantes',
    'Resolución adecuada'
  ];
  
  return (
    <div className="bg-white rounded-lg p-5 mt-5 shadow-md w-full max-w-4xl">
      <h3 className="text-xl font-bold text-purple-700 mb-3">Principios de UI para tus imágenes</h3>
      
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {principles.map((principle, index) => (
          <li 
            key={index}
            className="bg-blue-50 p-3 rounded-lg shadow-sm flex items-center gap-2"
          >
            <span className="text-purple-700 font-bold">✓</span>
            {principle}
          </li>
        ))}
      </ul>
    </div>
  );
};