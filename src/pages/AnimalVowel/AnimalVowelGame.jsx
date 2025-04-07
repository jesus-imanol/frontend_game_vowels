import React, { useState, useEffect } from 'react';
import { AnimalCard } from '../components/AnimalCard';
import { VowelDropZone } from '../components/VowelDropZone';
import { Feedback } from '../components/FeedBack';
import { LevelComplete } from '../components/LevelComplete';
import { ImageUploader } from '../components/ImageUploader';
import { UIInfoSection } from '../components/UIInoSection';
import axios from 'axios';

const AnimalVowelGame = () => {
  const [animals, setAnimals] = useState([]);
  const [draggedAnimal, setDraggedAnimal] = useState(null);
  const [placedAnimals, setPlacedAnimals] = useState({});
  const [vowelsCount, setVowelsCount] = useState({
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0
  });
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener datos del nivel actual
  useEffect(() => {
    const fetchLevel = async () => {
      try {
        setLoading(true);
        // Obtener el primer nivel
        const levelResponse = await axios.get('http://127.0.0.1:8000/levels/1/');
        setCurrentLevel(levelResponse.data);
        console.log(levelResponse);
        
        
        // Iniciar el nivel para el usuario actual
        if (levelResponse.data.id) {
          try {
            await axios.post(`http://127.0.0.1:8000/levels/${levelResponse.data.id}/start/`);
          } catch (e) {
            // Si no está autenticado, el juego funcionará pero no guardará progreso
            console.log('Usuario no autenticado, jugando sin seguimiento de progreso');
          }
        }
        
        // Establecer los animales del nivel
        setAnimals(levelResponse.data.animals.map(animal => ({
          ...animal,
          visible: true,
          placed: false
        })));
        
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el nivel. Por favor intenta de nuevo.');
        setLoading(false);
        console.error('Error cargando el nivel:', err);
      }
    };

    fetchLevel();
  }, []);

  // Handler para inicio de arrastre
  const handleDragStart = (animal) => {
    setDraggedAnimal(animal);
  };

  // Handler para soltar en una zona de vocal
  const handleDrop = (vowel) => {
    if (!draggedAnimal) return;
    
    // Actualizar estado de los animales
    setAnimals(prev => prev.map(animal => 
      animal.id === draggedAnimal.id 
        ? { ...animal, visible: false, placed: true } 
        : animal
    ));
    
    // Actualizar contadores de vocales
    setVowelsCount(prev => ({
      ...prev,
      [vowel]: prev[vowel] + 1
    }));
    
    // Guardar el animal colocado en su vocal correspondiente
    setPlacedAnimals(prev => ({
      ...prev,
      [draggedAnimal.id]: { ...draggedAnimal, placedVowel: vowel }
    }));
    
    setDraggedAnimal(null);
  };

  // Verificar respuestas
  const verifyAnswers = async () => {
    let correctCount = 0;
    let totalPlaced = Object.keys(placedAnimals).length;
    
    // Contar respuestas correctas
    Object.values(placedAnimals).forEach(animal => {
      if (animal.starting_vowel === animal.placedVowel) {
        correctCount++;
      }
    });
    
    // Calcular puntuación
    const newScore = totalPlaced > 0 ? Math.round((correctCount / totalPlaced) * 100) : 0;
    setScore(newScore);
    
    // Guardar progreso si hay un usuario autenticado
    if (currentLevel?.id) {
      try {
        await axios.post(`http://127.0.0.1:8000/api/progress/${currentLevel.id}/update_score/`, {
          score: newScore,
          completed: newScore >= 80
        });
      } catch (e) {
        console.log('No se pudo guardar el progreso');
      }
    }
    
    // Mostrar feedback
    if (newScore >= 80) {
      setFeedback({
        show: true,
        message: '¡Excelente trabajo!',
        type: 'correct'
      });
      
      // Si todos los animales fueron colocados correctamente
      if (correctCount === animals.length && correctCount === totalPlaced) {
        setTimeout(() => {
          setShowLevelComplete(true);
        }, 1500);
      }
    } else if (newScore >= 50) {
      setFeedback({
        show: true,
        message: '¡Buen intento!',
        type: 'correct'
      });
    } else {
      setFeedback({
        show: true,
        message: '¡Sigue intentando!',
        type: 'incorrect'
      });
    }
    
    // Ocultar feedback después de 2 segundos
    setTimeout(() => {
      setFeedback({ show: false, message: '', type: '' });
    }, 2000);
  };

  const goToNextLevel = () => {
    setShowLevelComplete(false);
    alert('¡Prepárate para el siguiente nivel! (Esta función se implementaría en una versión completa)');
  };

  if (loading) return <div className="text-center p-10">Cargando nivel...</div>;
  if (error) return <div className="bg-[#ffffff31] h-[100vh] w-[100%] text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-500 p-5">
      <header className="text-center mb-5 w-full">
        <h1 className="text-4xl font-bold text-purple-700 mb-2 animate__animated animate__fadeIn">
          Aprende Vocales con Animales
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Arrastra cada animal hasta la vocal por la que comienza su nombre. ¡Aprende las vocales de una forma divertida!
        </p>
      </header>
      
      <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-4xl animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold text-purple-700 mb-5">
          {currentLevel?.name || "Nivel 1: Animales y sus Vocales"}
        </h2>
        
        {/* Contenedor de animales */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {animals.map(animal => (
            <AnimalCard 
              key={animal.id}
              animal={animal}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
        
        {/* Contenedor de vocales */}
        <div className="flex justify-around w-full mt-5">
          {['a', 'e', 'i', 'o', 'u'].map(vowel => (
            <VowelDropZone 
              key={vowel}
              vowel={vowel}
              count={vowelsCount[vowel]}
              onDrop={() => handleDrop(vowel)}
              placedAnimals={Object.values(placedAnimals).filter(a => a.placedVowel === vowel)}
            />
          ))}
        </div>
        
        {/* Puntuación */}
        <div className="flex items-center gap-2 mt-5 bg-gradient-to-r from-purple-700 to-blue-500 p-3 rounded-full text-white mx-auto w-fit">
          <span className="text-lg">Puntuación:</span>
          <span className="text-2xl font-bold">{score}</span>
        </div>
        
        {/* Botón de verificar */}
        <div className="text-center mt-5">
          <button 
            onClick={verifyAnswers}
            className="bg-gradient-to-r from-purple-700 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:translate-y-1 transition-transform"
          >
            Verificar Respuestas
          </button>
        </div>
      </div>
      
      {/* Sección de subida de imágenes */}
      <ImageUploader />
      
      {/* Principios de UI */}
      <UIInfoSection />
      
      {/* Feedback */}
      {feedback.show && (
        <Feedback message={feedback.message} type={feedback.type} />
      )}
      
      {/* Modal de nivel completado */}
      {showLevelComplete && (
        <LevelComplete onNextLevel={goToNextLevel} />
      )}
    </div>
  );
};

export default AnimalVowelGame;