import React, { useState } from 'react';
import axios from 'axios';

export const ImageUploader = () => {
  const [customImages, setCustomImages] = useState([
    { id: 1, name: "Imagen de ejemplo 1", image: "/api/placeholder/120/120" },
    { id: 2, name: "Imagen de ejemplo 2", image: "/api/placeholder/120/120" }
  ]);
  
  const handleImageUpload = () => {
    // En una implementación real, esto abriría un selector de archivos
    alert('Aquí se abriría el selector de archivos para subir tus propias imágenes de animales.');
    
    // Simulación de carga de imagen
    // En un caso real, habría que usar FormData y hacer una petición POST
    /*
    const formData = new FormData();
    formData.append('name', 'Nombre del animal');
    formData.append('starting_vowel', 'a'); // Primera letra
    formData.append('image', file); // Archivo de la imagen
    
    axios.post('/api/custom-animals/', formData)
      .then(response => {
        setCustomImages(prev => [...prev, response.data]);
      })
      .catch(err => console.error('Error al subir imagen:', err));
    */
  };
  
  const handleRemoveImage = (id) => {
    // En un caso real, habría que hacer una solicitud DELETE
    setCustomImages(prev => prev.filter(img => img.id !== id));
    
    // axios.delete(`/api/custom-animals/${id}/`)
    //   .then(() => {
    //     setCustomImages(prev => prev.filter(img => img.id !== id));
    //   })
    //   .catch(err => console.error('Error al eliminar imagen:', err));
  };
  
  return (
    <div className="flex flex-col items-center mt-5 border-3 border-dashed border-purple-700 rounded-lg p-5 w-full max-w-2xl bg-purple-50 bg-opacity-20">
      <h3 className="text-xl font-bold text-purple-700 mb-3">Añade tus propias imágenes de animales</h3>
      
      <button 
        className="bg-gradient-to-r from-purple-700 to-blue-500 text-white px-5 py-2 rounded-full text-base flex items-center gap-2"
        onClick={handleImageUpload}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Subir Imágenes
      </button>
      
      <p className="text-sm text-gray-600 mt-3 text-center">
        Recomendaciones: Imágenes de animales con fondo claro, centradas y con buena iluminación
      </p>
      
      {/* Grid de imágenes subidas */}
      <div className="grid grid-cols-3 gap-4 mt-5 w-full sm:grid-cols-4">
        {customImages.map(image => (
          <div key={image.id} className="w-full relative rounded-lg overflow-hidden shadow-md">
            <img 
              src={image.image} 
              alt={image.name}
              className="w-full h-24 object-cover"
            />
            <button 
              className="absolute top-1 right-1 bg-red-500 bg-opacity-90 text-white w-6 h-6 rounded-full flex justify-center items-center text-xs font-bold"
              onClick={() => handleRemoveImage(image.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};