
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import AnimalVowelGame from './pages/AnimalVowel/AnimalVowelGame';
import GameLevelForm from './pages/GameLevelForm/GameLevel';
import AnimalForm from './pages/animals/pages/CreateAnimalForm';
import AnimalMemoryGame from './pages/AnimalMemorama/AnimalMemoryGame';
import IngecodeSocialInterface from './pages/AboutUs/AboutUs';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AnimalVowelGame />}></Route>
        <Route path='/gamelevelform' element={<GameLevelForm />}></Route>
        <Route path='/createAnimalForm' element={<AnimalForm />}></Route>
        <Route path='/memoramaGame' element={<AnimalMemoryGame />}></Route>
        <Route path='/aboutus' element={<IngecodeSocialInterface />}></Route>
      </Routes>
     </BrowserRouter>
  )
}

export default App
