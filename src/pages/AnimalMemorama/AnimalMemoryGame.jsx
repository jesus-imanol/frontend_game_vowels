import { useState, useEffect } from 'react';

export default function AnimalMemoryGame() {
  // Game states
  const [animals, setAnimals] = useState([]);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [difficulty, setDifficulty] = useState('normal'); // easy, normal, hard

  // Fetch animals from API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/animals/');
        if (!response.ok) throw new Error('Error al cargar los animales');
        
        const data = await response.json();
        setAnimals(data);
        setLoading(false);
        console.log(data);
        
      } catch (err) {
        setError('Error al cargar los animales: ' + err.message);
        setLoading(false);
      }
    };
    
    fetchAnimals();
  }, []);

  // Create game cards when animals are loaded or difficulty changes
  useEffect(() => {
    if (animals.length === 0) return;
    
    // Determine number of pairs based on difficulty
    let numberOfPairs;
    switch(difficulty) {
      case 'easy':
        numberOfPairs = Math.min(6, animals.length);
        break;
      case 'hard':
        numberOfPairs = Math.min(12, animals.length);
        break;
      default: // normal
        numberOfPairs = Math.min(8, animals.length);
    }
    
    // Select random animals for the game
    const shuffledAnimals = [...animals].sort(() => 0.5 - Math.random());
    const selectedAnimals = shuffledAnimals.slice(0, numberOfPairs);
    
    // Create pairs of cards
    const gamePairs = selectedAnimals.flatMap(animal => [
      { ...animal, id: `${animal.id}-1`, matched: false, flipped: false },
      { ...animal, id: `${animal.id}-2`, matched: false, flipped: false }
    ]);
    
    // Shuffle the cards
    const shuffledCards = gamePairs.sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
    
    // Reset game state
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
    setTimer(0);
    setTimerActive(false);
    setGameStarted(false);
  }, [animals, difficulty]);

  // Timer functionality
  useEffect(() => {
    let interval;
    
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setGameComplete(true);
      setTimerActive(false);
    }
  }, [matchedPairs, cards]);

  // Handle card flip
  const handleCardClick = (card) => {
    // Don't allow click if:
    // - Card is already flipped
    // - Card is already matched
    // - Two cards are already flipped
    if (
      flippedCards.includes(card.id) || 
      matchedPairs.includes(card.name) || 
      flippedCards.length >= 2
    ) {
      return;
    }
    
    // Start the game and timer if this is the first move
    if (!gameStarted) {
      setGameStarted(true);
      setTimerActive(true);
    }
    
    // Flip the card
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);
    
    // Update cards state to show flipped card
    setCards(prevCards => 
      prevCards.map(c => 
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );
    
    // If this is the second card flipped
    if (newFlippedCards.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      // Get the two flipped cards
      const firstCardId = newFlippedCards[0];
      const secondCardId = newFlippedCards[1];
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);
      
      // Check for a match
      if (firstCard.name === secondCard.name) {
        // It's a match!
        setMatchedPairs(prev => [...prev, firstCard.name]);
        setFlippedCards([]);
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(c => 
              newFlippedCards.includes(c.id) ? { ...c, flipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Restart the game
  const restartGame = () => {
    // Re-shuffle with same difficulty
    const currentDifficulty = difficulty;
    setDifficulty('');
    setTimeout(() => setDifficulty(currentDifficulty), 10);
  };

  // Change difficulty
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
          Memorama de Animales
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Encuentra todas las parejas de animales volteando las cartas. ¡Intenta hacerlo en la menor cantidad de movimientos!
        </p>
      </header>
      
      {/* Game controls */}
      <div className="mb-6 flex justify-center gap-4 flex-wrap">
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md">
          <span className="text-purple-800 font-medium">Dificultad</span>
          <div className="flex mt-2 gap-2">
            {['easy', 'normal', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() => changeDifficulty(level)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  difficulty === level
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level === 'easy' ? 'Fácil' : level === 'normal' ? 'Normal' : 'Difícil'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md">
          <span className="text-purple-800 font-medium">Tiempo</span>
          <div className="text-2xl font-bold text-gray-700">{formatTime(timer)}</div>
        </div>
        
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md">
          <span className="text-purple-800 font-medium">Movimientos</span>
          <div className="text-2xl font-bold text-gray-700">{moves}</div>
        </div>
        
        <button
          onClick={restartGame}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
        >
          Reiniciar Juego
        </button>
      </div>
      
      {/* Game board */}
      <div className="max-w-4xl mx-auto">
        <div className={`grid gap-4 mx-auto ${
          difficulty === 'easy' 
            ? 'grid-cols-3 sm:grid-cols-4' 
            : difficulty === 'hard'
              ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'
              : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-4'
        }`}>
          {cards.map((card) => (
            <div 
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="w-full aspect-square cursor-pointer relative"
            >
              {/* Card container with perspective */}
              <div className="w-full h-full perspective-500">
                {/* Card inner container that flips */}
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d 
                  ${(card.flipped || matchedPairs.includes(card.name)) ? 'rotate-y-180' : ''}`}>
                  
                  {/* Card Back */}
                  <div className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 
                    rounded-xl shadow-md flex items-center justify-center backface-hidden">
                    <div className="text-white text-4xl font-bold">?</div>
                  </div>
                  
                  {/* Card Front */}
                  <div className="absolute w-full h-full bg-white rounded-xl shadow-md 
                    flex items-center justify-center p-2 backface-hidden transform rotate-y-180">
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Game complete modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">¡Juego Completado!</h2>
            <div className="space-y-4 mb-6">
              <p className="text-xl text-gray-700">¡Felicidades! Has encontrado todas las parejas.</p>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Tiempo</div>
                  <div className="text-2xl font-bold text-purple-700">{formatTime(timer)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Movimientos</div>
                  <div className="text-2xl font-bold text-purple-700">{moves}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={restartGame}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium"
              >
                Jugar de Nuevo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for card flip effect */}
      <style jsx>{`
        .perspective-500 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}