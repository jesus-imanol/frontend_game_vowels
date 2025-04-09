import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.png';
export default function AnimalForm() {
  const [formData, setFormData] = useState({
    name: '',
    starting_vowel: 'a', // Valor predeterminado
    image: null
  });
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Crear una vista previa de la imagen
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Crear un objeto FormData para enviar el archivo
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('starting_vowel', formData.starting_vowel);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('http://127.0.0.1:8000/animals/', {
        method: 'POST',
        body: formDataToSend,
        // No incluyas Content-Type header, FormData lo establecerá automáticamente
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Animal agregado correctamente');
        setFormData({
          name: '',
          starting_vowel: 'a',
          image: null
        });
        setPreviewUrl(null);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setMessage(`Error al conectar con el servidor: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6 bg-white shadow-md rounded-lg">
      <div className='flex'>
        <div className='flex flex-col'>
          <h1 className="text-2xl font-bold">Agregar Nuevo Animal</h1>
          <h1 className="text-1xl font-normal mt-2 cursor-pointer hover:text-blue-600"
          onClick={()=>navigate("/gamelevelform")}>Agregar Nuevo nivel</h1>
        </div>
      <img
        src={logo}
        alt="Logo"
        className="w-32 h-16 mb-4 cursor-pointer"
        onClick={() => navigate("/")}></img>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre */}
        <div>
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
        
        {/* Campo Vocal Inicial */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="starting_vowel">
            Vocal inicial
          </label>
          <select
            id="starting_vowel"
            name="starting_vowel"
            value={formData.starting_vowel}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="a">A</option>
            <option value="e">E</option>
            <option value="i">I</option>
            <option value="o">O</option>
            <option value="u">U</option>
          </select>
        </div>
        
        {/* Campo Imagen */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Imagen
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        {/* Previsualización de imagen */}
        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-bold mb-2">Vista previa:</p>
            <img 
              src={previewUrl} 
              alt="Vista previa" 
              className="max-w-full h-auto max-h-64 border rounded"
            />
          </div>
        )}
        
        {/* Botón enviar */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Agregar Animal'}
          </button>
          
          {message && (
            <span className={`ml-4 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </span>
          )}
        </div>
      </form>
      
      {/* Panel de ayuda */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Instrucciones:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>El nombre debe ser descriptivo y único para cada animal.</li>
          <li>Selecciona la vocal con la que empieza el sonido del animal.</li>
          <li>La imagen debe ser clara y representativa del animal.</li>
          <li>Formatos recomendados: JPG, PNG o WebP.</li>
        </ul>
      </div>
    </div>
  );
}