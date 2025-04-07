
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import AnimalVowelGame from './pages/AnimalVowel/AnimalVowelGame';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AnimalVowelGame />}></Route>
      </Routes>
     </BrowserRouter>
  )
}

export default App
