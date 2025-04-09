import { useState, useEffect } from 'react';
import logo from '/logo.png';
import { useNavigate } from 'react-router-dom';
export default function GameLevelForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: '',
    animal_ids: []
  });
  const navigate = useNavigate();
  
  const [animals, setAnimals] = useState([]);
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargar la lista de animales al iniciar
    fetchAnimals();
    // Cargar niveles existentes
    fetchLevels();
  }, []);

  const fetchAnimals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/animals/');
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error('Error al cargar animales:', error);
      setMessage('Error al cargar la lista de animales');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLevels = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/levels/');
      const data = await response.json();
      setLevels(data);
    } catch (error) {
      console.error('Error al cargar niveles:', error);
      setMessage('Error al cargar los niveles existentes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAnimalSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData({
      ...formData,
      animal_ids: selectedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/levels/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Nivel creado correctamente');
        setFormData({
          name: '',
          description: '',
          difficulty: '',
          animal_ids: []
        });
        // Actualizar la lista de niveles
        fetchLevels();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || 'No se pudo crear el nivel'}`);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setMessage('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className='flex items-center justify-start ml-7 gap-8'>
          <div className='flex flex-col items-start'>
          <h1 className="text-2xl font-bold ">Gestión de Niveles</h1>
          <h1 className="text-1xl font-normal mt-2 cursor-pointer hover:text-blue-600"
          onClick={()=>navigate("/createAnimalForm")}>Agregar Nuevo animal</h1>
          </div>
      <img src={logo} alt="" className='w-32 h-16 cursor-pointer' onClick={()=>navigate("/")}/>
      </div>
      {/* Formulario para crear niveles */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Crear Nuevo Nivel</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
              Dificultad
            </label>
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="100"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_ids">
              Animales
            </label>
            <select
              id="animal_ids"
              name="animal_ids"
              multiple
              value={formData.animal_ids}
              onChange={handleAnimalSelection}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              size="5"
            >
              {isLoading ? (
                <option disabled>Cargando animales...</option>
              ) : (
                animals.map(animal => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name || animal.id}
                  </option>
                ))
              )}
            </select>
            <p className="text-xs text-gray-500 mt-1">Mantén presionado Ctrl (o Cmd en Mac) para seleccionar múltiples animales</p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Guardar Nivel'}
            </button>
            
            {message && (
              <span className={`ml-4 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>
      
      {/* Lista de niveles existentes */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Niveles Existentes</h2>
        
        {isLoading ? (
          <p>Cargando niveles...</p>
        ) : levels.length === 0 ? (
          <p className="text-gray-500">No hay niveles disponibles</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dificultad
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Animales
                  </th>
                </tr>
              </thead>
              <tbody>
                {levels.map(level => (
                  <tr key={level.id || level.name}>
                    <td className="py-2 px-4 border-b border-gray-200">{level.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{level.description}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{level.difficulty}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {level.animal_ids ? (
                        level.animal_ids.length > 0 ? 
                        level.animal_ids.map(id => {
                          const animal = animals.find(a => a.id === id);
                          return animal ? animal.name : id;
                        }).join(', ') : 
                        'Ninguno'
                      ) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}