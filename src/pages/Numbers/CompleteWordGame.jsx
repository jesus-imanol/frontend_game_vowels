import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import logo from '/logo.png'

export default function CompleteWordGame() {
  const [animals, setAnimals] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState([]);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('normal'); // 'easy', 'normal', 'hard'
  
  const navigate = useNavigate();
  // Ref para el audio
  const victoryAudioRef = useRef(null);
  
  // API base URL
  const API_URL = 'http://127.0.0.1:8000';

  // Mock data for development when API is unavailable due to CORS
  const mockAnimals = [
    {
      id: 3,
      name: "Abeja",
      starting_vowel: "a",
      image: "/api/placeholder/300/250"
    },
    {
      id: 4,
      name: "Erizo",
      starting_vowel: "e",
      image: "/api/placeholder/300/250"
    },
    {
      id: 1,
      name: "Escarabajo",
      starting_vowel: "e",
      image: "/api/placeholder/300/250"
    }
  ];

  // Inicializar el audio cuando el componente se monta
  useEffect(() => {
    victoryAudioRef.current = new Audio('/victory.mp3');
    
    // Limpieza cuando el componente se desmonta
    return () => {
      if (victoryAudioRef.current) {
        victoryAudioRef.current.pause();
        victoryAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Reproducir audio cuando se muestra la pantalla de éxito
  useEffect(() => {
    if (showSuccess && victoryAudioRef.current) {
      // Reiniciar el audio por si ya estaba reproduciéndose
      victoryAudioRef.current.currentTime = 0;
      
      // Reproducir la música de victoria
      victoryAudioRef.current.play().catch(error => {
        console.error('Error al reproducir el audio de victoria:', error);
      });
    }
  }, [showSuccess]);

  // Fetch all animals
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        
        let animalsData;
        try {
          // Try to fetch from the real API first
          const response = await fetch(`${API_URL}/animals/`, {
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
          animalsData = await response.json();
        } catch (apiError) {
          console.warn('Falling back to mock data due to API error:', apiError);
          // Fall back to mock data if API fetch fails
          animalsData = mockAnimals;
        }
        
        // Shuffle the animals for a random order
        const shuffledAnimals = shuffleArray([...animalsData]);
        setAnimals(shuffledAnimals);
        
        // If animals are available, start with the first one
        if (shuffledAnimals.length > 0) {
          setupWord(shuffledAnimals[0]);
        } else {
          setLoading(false);
          setError('No hay animales disponibles');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading animals:', err);
        setError('Error al cargar los animales: ' + err.message);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Setup the current word
  const setupWord = (animal) => {
    if (!animal) return;
    
    const name = animal.name.toLowerCase();
    setCurrentWord({
      animal: animal,
      letters: name.split(''),
      hiddenIndexes: generateHiddenIndexes(name, difficulty)
    });
    
    // Initialize user input with empty spaces for hidden letters
    const initialInput = [];
    name.split('').forEach(() => {
      initialInput.push('');
    });
    
    setUserInput(initialInput);
    setRevealedHints([]);
  };

  // Generate indexes to hide based on difficulty
  const generateHiddenIndexes = (word, difficultyLevel) => {
    const length = word.length;
    let hiddenPercentage;
    
    switch(difficultyLevel) {
      case 'easy':
        hiddenPercentage = 0.2 + Math.random() * 0.1; // 20-30%
        break;
      case 'normal':
        hiddenPercentage = 0.3 + Math.random() * 0.2; // 30-50%
        break;
      case 'hard':
        hiddenPercentage = 0.5 + Math.random() * 0.2; // 50-70%
        break;
      default:
        hiddenPercentage = 0.3 + Math.random() * 0.2; // 30-50% (default)
    }
    
    const hiddenCount = Math.max(2, Math.floor(length * hiddenPercentage));
    const indexes = [];
    
    while (indexes.length < hiddenCount) {
      const index = Math.floor(Math.random() * length);
      if (!indexes.includes(index)) {
        indexes.push(index);
      }
    }
    
    return indexes;
  };

  // Handle user input change
  const handleInputChange = (index, value) => {
    const updatedInput = [...userInput];
    updatedInput[index] = value.toLowerCase();
    setUserInput(updatedInput);
  };

  // Check if the answer is correct
  const checkAnswer = () => {
    if (!currentWord) return;
    
    let isCorrect = true;
    const wordLetters = currentWord.letters;
    
    // Check each hidden letter
    currentWord.hiddenIndexes.forEach(index => {
      if (userInput[index] !== wordLetters[index]) {
        isCorrect = false;
      }
    });
    
    if (isCorrect) {
      // Calculate points based on difficulty and hints used
      const basePoints = difficulty === 'easy' ? 5 : (difficulty === 'normal' ? 10 : 15);
      const hintPenalty = revealedHints.length * 2;
      const pointsEarned = Math.max(1, basePoints - hintPenalty);
      
      setScore(prevScore => prevScore + pointsEarned);
      setFeedback({
        show: true,
        message: `¡Correcto! +${pointsEarned} puntos`,
        type: 'correct'
      });
      
      setTimeout(() => {
        setFeedback({ show: false, message: '', type: '' });
        nextAnimal();
      }, 1500);
    } else {
      setFeedback({
        show: true,
        message: 'Intenta de nuevo',
        type: 'incorrect'
      });
      
      setTimeout(() => {
        setFeedback({ show: false, message: '', type: '' });
      }, 1500);
    }
  };

  // Move to the next animal
  const nextAnimal = () => {
    if (!animals) return;
    
    const nextIndex = currentAnimalIndex + 1;
    
    if (nextIndex < animals.length) {
      setCurrentAnimalIndex(nextIndex);
      setupWord(animals[nextIndex]);
    } else {
      // Game completed
      setShowSuccess(true);
    }
  };

  // Provide a hint (reveal a random hidden letter)
  const giveHint = () => {
    if (!currentWord || !currentWord.hiddenIndexes || currentWord.hiddenIndexes.length === 0) return;
    
    // Find hidden indexes that haven't been revealed yet
    const availableIndexes = currentWord.hiddenIndexes.filter(
      index => !revealedHints.includes(index)
    );
    
    if (availableIndexes.length === 0) return;
    
    // Randomly select one to reveal
    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    
    // Update user input with the correct letter
    const updatedInput = [...userInput];
    updatedInput[randomIndex] = currentWord.letters[randomIndex];
    setUserInput(updatedInput);
    
    // Mark this index as revealed
    setRevealedHints([...revealedHints, randomIndex]);
    
    // Deduct points for using hint
    setScore(prevScore => Math.max(0, prevScore - 2));
  };

  // Change difficulty
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    
    // Reset the game with the new difficulty
    setCurrentAnimalIndex(0);
    setScore(0);
    setAnimals(shuffleArray([...animals]));
    
    if (animals.length > 0) {
      setupWord(animals[0]);
    }
  };

  // Restart game
  const restartGame = () => {
    setShowSuccess(false);
    setCurrentAnimalIndex(0);
    setScore(0);
    setAnimals(shuffleArray([...animals]));
    
    if (animals.length > 0) {
      setupWord(animals[0]);
    }
    
    // Detener el audio cuando se reinicia el juego
    if (victoryAudioRef.current) {
      victoryAudioRef.current.pause();
      victoryAudioRef.current.currentTime = 0;
    }
  };

  // Función para manejar el audio manualmente
  const toggleAudio = () => {
    if (victoryAudioRef.current) {
      if (victoryAudioRef.current.paused) {
        victoryAudioRef.current.play().catch(error => {
          console.error('Error al reproducir el audio:', error);
        });
      } else {
        victoryAudioRef.current.pause();
      }
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <div className="text-2xl font-bold text-purple-600">Cargando juego...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-50" style={{ backgroundColor: '#D7E5FA' }}>
      <header className="p-6 text-center bg-gradient-to-r from-purple-700 to-purple-800 flex" style={{ backgroundColor: '#9333EA' }}>
        <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-4" 
        onClick={() => navigate('/')}/>
        <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Completa la Palabra
        </h1>
        <p className="text-purple-100 max-w-lg mx-auto">
          Observa la imagen y completa el nombre del animal con las letras correctas.
        </p>
        </div>
      </header>
      
      {/* Difficulty selection */}
      <div className="mb-6 text-center p-4">
        <h2 className="text-xl font-bold text-purple-800 mb-2">Selecciona la dificultad:</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {['easy', 'normal', 'hard'].map(diff => (
            <button
              key={diff}
              onClick={() => changeDifficulty(diff)}
              className={`px-4 py-2 rounded-lg ${difficulty === diff 
                ? 'bg-purple-700 text-white' 
                : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'}`}
              style={{ backgroundColor: difficulty === diff ? '#9333EA' : '#FFFFFF' }}
            >
              {diff === 'easy' ? 'Fácil' : diff === 'normal' ? 'Normal' : 'Difícil'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Game Container */}
      {currentWord && (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-10" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700" style={{ color: '#9333EA' }}>
              Completar Animales
            </h2>
            <div className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#D7E5FA', color: '#9333EA' }}>
              Dificultad: {difficulty === 'easy' ? 'Fácil' : difficulty === 'normal' ? 'Normal' : 'Difícil'}
            </div>
          </div>
          
          {/* Current Animal */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="bg-purple-50 rounded-lg p-2 flex items-center justify-center" style={{ backgroundColor: '#D7E5FA' }}>
              <img 
                src={currentWord.animal.image} 
                alt="Animal para adivinar"
                className="w-64 h-48 object-contain" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/300/250";
                }}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-purple-700" style={{ color: '#9333EA' }}>
                ¿Qué animal es?
              </h3>
              <p className="text-gray-600 mb-4">
                Completa las letras que faltan en el nombre de este animal.
              </p>
              
              <p className="text-sm text-purple-600 mb-2">
                Pista: Este animal comienza con la vocal "{currentWord.animal.starting_vowel}"
              </p>
              
              {/* Letter Boxes */}
              <div className="flex flex-wrap gap-2 justify-center">
                {currentWord.letters.map((letter, index) => {
                  const isHidden = currentWord.hiddenIndexes.includes(index);
                  const isRevealed = revealedHints.includes(index);
                  
                  return (
                    <div key={index} className="relative">
                      {isHidden ? (
                        <input
                          type="text"
                          maxLength="1"
                          value={userInput[index]}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className={`w-12 h-12 border-2 rounded-md text-center text-xl font-bold ${
                            isRevealed ? 'bg-purple-100 border-purple-300' : 'bg-white border-purple-300'
                          }`}
                          style={{ 
                            borderColor: isRevealed ? '#D7E5FA' : '#9333EA',
                            backgroundColor: isRevealed ? '#D7E5FA' : '#FFFFFF',
                            color: '#9333EA'
                          }}
                        />
                      ) : (
                        <div 
                          className="w-12 h-12 border-2 border-purple-200 rounded-md flex items-center justify-center text-xl font-bold bg-purple-50"
                          style={{ backgroundColor: '#D7E5FA', borderColor: '#9333EA', color: '#9333EA' }}
                        >
                          {letter}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={giveHint}
              disabled={revealedHints.length >= currentWord.hiddenIndexes.length}
              className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#D7E5FA', color: '#9333EA' }}
            >
              Pista (-2 puntos)
            </button>
            
            <button
              onClick={checkAnswer}
              className="px-6 py-2 rounded-lg bg-purple-700 text-white font-medium hover:bg-purple-800"
              style={{ backgroundColor: '#9333EA' }}
            >
              Comprobar
            </button>
          </div>
          
          {/* Progress Display */}
          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-purple-700" style={{ color: '#9333EA' }}>
              Animal {currentAnimalIndex + 1} de {animals.length}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-700" style={{ color: '#9333EA' }}>Puntuación:</span>
              <span className="text-lg font-bold text-purple-700" style={{ color: '#9333EA' }}>{score}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 w-full bg-purple-100 rounded-full h-2.5" style={{ backgroundColor: '#D7E5FA' }}>
            <div 
              className="bg-purple-700 h-2.5 rounded-full" 
              style={{ width: `${(currentAnimalIndex / animals.length) * 100}%`, backgroundColor: '#9333EA' }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Feedback */}
      {feedback.show && (
        <div className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-lg text-white text-xl font-bold z-50 
          ${feedback.type === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {feedback.message}
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#9333EA' }}>¡Juego Completado!</h2>
            <p className="text-xl text-gray-700 mb-6">
              ¡Felicidades! Has completado el juego con {score} puntos.
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2" style={{ color: '#9333EA' }}>Cambia la dificultad:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['easy', 'normal', 'hard'].map(diff => (
                  <button
                    key={diff}
                    onClick={() => {
                      setShowSuccess(false);
                      changeDifficulty(diff);
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200"
                    style={{ backgroundColor: '#D7E5FA', color: '#9333EA' }}
                  >
                    {diff === 'easy' ? 'Fácil' : diff === 'normal' ? 'Normal' : 'Difícil'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={restartGame}
                className="px-6 py-3 rounded-lg bg-purple-700 text-white font-medium"
                style={{ backgroundColor: '#9333EA' }}
              >
                Jugar de nuevo
              </button>
              
              <button
                onClick={toggleAudio}
                className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200"
                style={{ backgroundColor: '#D7E5FA', color: '#9333EA' }}
              >
                {victoryAudioRef.current && !victoryAudioRef.current.paused 
                  ? 'Pausar música' 
                  : 'Reproducir música de nuevo'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Audio element (no visible, pero lo incluimos para pre-cargar) */}
      <audio
        src="/victory.mp3"
        preload="auto"
        style={{ display: 'none' }}
      />
    </div>
  );
}