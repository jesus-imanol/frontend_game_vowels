// src/services/api.js
import axios from 'axios';

// Configuración base para axios
const api = axios.create({
  baseURL: '/api', // Asegúrate de que esto coincida con tu configuración de Django
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken') 
  }
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Funciones para interactuar con la API
const apiService = {
  // Animales
  getAnimals: () => api.get('/animals/'),
  getAnimalsByVowel: () => api.get('/animals/by_vowel/'),
  
  // Niveles
  getLevels: () => api.get('/levels/'),
  getLevel: (id) => api.get(`/levels/${id}/`),
  startLevel: (id) => api.post(`/levels/${id}/start/`),
  
  // Progreso del usuario
  getUserProgress: () => api.get('/progress/'),
  getProgressSummary: () => api.get('/progress/summary/'),
  updateScore: (progressId, data) => api.post(`/progress/${progressId}/update_score/`, data),
  
  // Imágenes personalizadas de animales
  getCustomImages: () => api.get('/custom-animals/'),
  uploadCustomImage: (formData) => api.post('/custom-animals/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': getCookie('csrftoken')
    }
  }),
  deleteCustomImage: (id) => api.delete(`/custom-animals/${id}/`)
};

export default apiService;