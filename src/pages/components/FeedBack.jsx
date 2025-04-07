import React from 'react';

export const Feedback = ({ message, type }) => {
  const bgColor = type === 'correct' 
    ? 'bg-green-500 bg-opacity-90' 
    : 'bg-red-500 bg-opacity-90';
  
  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${bgColor} text-white p-5 px-10 rounded-lg text-2xl z-50`}>
      {message}
    </div>
  );
};