import { useState, useEffect } from 'react';

export default function AnimalVowelGame() {
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [draggedAnimal, setDraggedAnimal] = useState(null);
  const [placedAnimals, setPlacedAnimals] = useState({});
  const [vowelsCount, setVowelsCount] = useState({
    a: 0, e: 0, i: 0, o: 0, u: 0
  });
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  // Fetch all levels
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        // Simulating API fetch - replace with your actual API call
        const response = await fetch('http://127.0.0.1:8000/levels/');
        if (!response.ok) throw new Error('Error al cargar los niveles');
        
        const data = await response.json();
        setLevels(data);
        
        // If levels are available, load the first one
        if (data.length > 0) {
          // No need to fetch again as the API already returns animals with levels
          setCurrentLevel(data[0]);
          setAnimals(data[0].animals.map(animal => ({
            ...animal,
            visible: true,
            placed: false
          })));
          setLoading(false);
        } else {
          setLoading(false);
          setError('No hay niveles disponibles');
        }
      } catch (err) {
        setError('Error al cargar los niveles: ' + err.message);
        setLoading(false);
      }
    };
    fetchLevels();
  }, []);

  // Change level without additional fetch since we already have all level data
  const changeLevel = (levelId) => {
    // Reset game state
    setPlacedAnimals({});
    setVowelsCount({ a: 0, e: 0, i: 0, o: 0, u: 0 });
    setScore(0);
    setShowLevelComplete(false);
    
    // Find the selected level in our already fetched levels
    const selectedLevel = levels.find(level => level.id === levelId);
    if (selectedLevel) {
      setCurrentLevel(selectedLevel);
      setAnimals(selectedLevel.animals.map(animal => ({
        ...animal,
        visible: true,
        placed: false
      })));
    }
  };

  // Handle drag start
  const handleDragStart = (animal) => {
    setDraggedAnimal(animal);
  };

  // Handle drop on vowel zone
  const handleDrop = (vowel) => {
    if (!draggedAnimal) return;
    
    // Update animals state
    setAnimals(prev => prev.map(animal => 
      animal.id === draggedAnimal.id 
        ? { ...animal, visible: false, placed: true } 
        : animal
    ));
    
    // Update vowel counters
    setVowelsCount(prev => ({
      ...prev,
      [vowel]: prev[vowel] + 1
    }));
    
    // Save placed animal
    setPlacedAnimals(prev => ({
      ...prev,
      [draggedAnimal.id]: { ...draggedAnimal, placedVowel: vowel }
    }));
    
    setDraggedAnimal(null);
  };

  // Verify answers
  const verifyAnswers = () => {
    let correctCount = 0;
    let totalPlaced = Object.keys(placedAnimals).length;
    
    // Count correct answers
    Object.values(placedAnimals).forEach(animal => {
      if (animal.starting_vowel === animal.placedVowel) {
        correctCount++;
      }
    });
    
    // Calculate score
    const newScore = totalPlaced > 0 ? Math.round((correctCount / totalPlaced) * 100) : 0;
    setScore(newScore);
    
    // Show feedback
    if (newScore >= 80) {
      setFeedback({
        show: true,
        message: '¡Excelente trabajo!',
        type: 'correct'
      });
      
      // If all animals were placed correctly
      if (correctCount === animals.length && correctCount === totalPlaced) {
        setTimeout(() => {
          setShowLevelComplete(true);
        }, 1500);
      }
    } else if (newScore >= 50) {
      setFeedback({
        show: true,
        message: '¡Buen intento!',
        type: 'normal'
      });
    } else {
      setFeedback({
        show: true,
        message: '¡Sigue intentando!',
        type: 'incorrect'
      });
    }
    
    // Hide feedback after 2 seconds
    setTimeout(() => {
      setFeedback({ show: false, message: '', type: '' });
    }, 2000);
  };

  // Close level complete modal and load next level
  const goToNextLevel = () => {
    setShowLevelComplete(false);
    // Find next level in the array
    const currentIndex = levels.findIndex(level => level.id === currentLevel.id);
    if (currentIndex < levels.length - 1) {
      changeLevel(levels[currentIndex + 1].id);
    } else {
      alert('¡Has completado todos los niveles!');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="text-2xl font-bold text-blue-600">Cargando juego...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          Aprende Vocales con Animales
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Arrastra cada animal hasta la vocal por la que comienza su nombre.
        </p>
      </header>
      
      {/* Level selection */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-purple-700 mb-2">Selecciona un nivel:</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {levels.map(level => (
            <button
              key={level.id}
              onClick={() => changeLevel(level.id)}
              className={`px-4 py-2 rounded-lg ${currentLevel?.id === level.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50'}`}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Current Level Info */}
      {currentLevel && (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700">
              {currentLevel.name}
            </h2>
            <div className="text-sm px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              Dificultad: {currentLevel.difficulty}%
            </div>
          </div>
          <p className="text-gray-600 mb-4">{currentLevel.description}</p>
          
          {/* Animals container */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {animals.length > 0 ? (
              animals.map(animal => (
                animal.visible && (
                  <div
                    key={animal.id}
                    className="bg-white rounded-lg shadow-md p-3 w-32 h-40 flex flex-col items-center cursor-grab"
                    draggable
                    onDragStart={() => handleDragStart(animal)}
                  >
                    <img 
                      src={animal.image} 
                      alt={animal.name}
                      className="w-24 h-24 object-contain mb-2" 
                    />
                    <span className="text-center font-medium text-gray-800">
                      {animal.name}
                    </span>
                  </div>
                )
              ))
            ) : (
              <div className="text-center p-6 text-gray-500">
                No hay animales en este nivel
              </div>
            )}
          </div>
          
          {/* Vowels container */}
          <div className="flex justify-around w-full mt-8">
            {['a', 'e', 'i', 'o', 'u'].map(vowel => (
              <div
                key={vowel}
                className="flex flex-col items-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(vowel)}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold uppercase mb-2">
                  {vowel}
                </div>
                <div className="min-h-24 w-28 bg-gray-100 rounded-lg p-2 flex flex-col items-center gap-1">
                  {Object.values(placedAnimals)
                    .filter(a => a.placedVowel === vowel)
                    .map(animal => (
                      <div key={animal.id} className="w-full">
                        <img 
                          src={animal.image} 
                          alt={animal.name}
                          className="w-10 h-10 object-contain mx-auto" 
                        />
                      </div>
                    ))
                  }
                </div>
                <div className="mt-1 text-sm font-medium bg-purple-100 rounded-full px-2 py-0.5">
                  {vowelsCount[vowel]}
                </div>
              </div>
            ))}
          </div>
          
          {/* Score */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-lg text-gray-700">Puntuación:</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              {score}
            </span>
          </div>
          
          {/* Verify button */}
          <div className="text-center mt-6">
            <button 
              onClick={verifyAnswers}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-700 transform transition hover:-translate-y-1"
              disabled={Object.keys(placedAnimals).length === 0}
            >
              Verificar Respuestas
            </button>
          </div>
        </div>
      )}
      
      {/* Feedback */}
      {feedback.show && (
        <div className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-lg text-white text-xl font-bold z-50 
          ${feedback.type === 'correct' ? 'bg-green-500' : 
            feedback.type === 'incorrect' ? 'bg-red-500' : 'bg-blue-500'}`}
        >
          {feedback.message}
        </div>
      )}
      
      {/* Level Complete Modal */}
      {showLevelComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">¡Nivel Completado!</h2>
            <p className="text-xl text-gray-700 mb-6">¡Felicidades! Has completado este nivel exitosamente.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={goToNextLevel}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium"
              >
                Siguiente Nivel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}