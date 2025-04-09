import { useState, useEffect } from 'react';
import { BookOpen, Lightbulb, Award } from 'lucide-react';
import { useNavigate } from 'react-router';
import logo from '/logo.png'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  useEffect(() => {
    // Simular carga de recursos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-purple-700 font-medium">Cargando EcoAlfabeto...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-50 flex flex-col">
      {/* Encabezado */}
      <header className="p-6 bg-gradient-to-r from-purple-700 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            {/* Reemplazando el SVG por la imagen de logo */}
            <img 
            onClick={() => navigate('/')}
            src={logo} alt="EcoAlfabeto Logo" className="w-28 h-14 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold">EcoAlfabeto</h1>
          </div>
          
          <nav className="flex space-x-4">
            <a href="#" className="px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">Inicio</a>
            <a href="#" className="px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">Sobre Nosotros</a>
            <a href="#" className="px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">Contacto</a>
          </nav>
        </div>
      </header>
      
      {/* Contenido Principal */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Banner de Bienvenida */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
                  ¡Bienvenidos a EcoAlfabeto!
                </h2>
                <p className="text-gray-600 mb-6">
                  Aprende sobre animales y naturaleza mientras mejoras tu vocabulario 
                  con juegos interactivos diseñados para Alfabetas de todas las edades.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition-colors duration-200 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" /> Comenzar Ahora
                  </button>
                  <button className="px-6 py-3 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-colors duration-200 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5" /> Conocer Más
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 bg-purple-50 flex items-center justify-center p-8">
                <svg
                  className="w-64 h-64"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="100" r="96" fill="#D7E5FA" stroke="#9333EA" strokeWidth="2" />
                  <path d="M40 75C40 65 55 50 70 50C85 50 95 60 100 65C105 60 115 50 130 50C145 50 160 65 160 75C160 120 105 150 100 150C95 150 40 120 40 75Z" fill="#9333EA" />
                  <path d="M70 90C70 90 85 110 100 110C115 110 130 90 130 90" stroke="#D7E5FA" strokeWidth="4" strokeLinecap="round" />
                  <path d="M85 65C88 65 88 70 85 70C82 70 82 65 85 65Z" fill="#D7E5FA" />
                  <path d="M115 65C118 65 118 70 115 70C112 70 112 65 115 65Z" fill="#D7E5FA" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Sección de Juegos */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-purple-800 mb-2">Nuestros Juegos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explora nuestra colección de juegos educativos diseñados para 
                aprender mientras te diviertes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Juego de Completar Palabra */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="h-48 bg-purple-100 flex items-center justify-center p-4">
                  <svg
                    className="w-32 h-32"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="10" y="30" width="100" height="60" rx="4" fill="#9333EA" />
                    <rect x="20" y="40" width="15" height="15" rx="2" fill="#D7E5FA" />
                    <rect x="40" y="40" width="15" height="15" rx="2" fill="#D7E5FA" />
                    <rect x="60" y="40" width="15" height="15" rx="2" fill="white" stroke="#D7E5FA" strokeWidth="2" strokeDasharray="3 3" />
                    <rect x="80" y="40" width="15" height="15" rx="2" fill="#D7E5FA" />
                    <rect x="20" y="65" width="15" height="15" rx="2" fill="#D7E5FA" />
                    <rect x="40" y="65" width="15" height="15" rx="2" fill="white" stroke="#D7E5FA" strokeWidth="2" strokeDasharray="3 3" />
                    <rect x="60" y="65" width="15" height="15" rx="2" fill="#D7E5FA" />
                    <rect x="80" y="65" width="15" height="15" rx="2" fill="white" stroke="#D7E5FA" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="95" cy="25" r="15" fill="#D7E5FA" stroke="#9333EA" strokeWidth="2" />
                    <path d="M90 25H100" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M95 20V30" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-800 mb-2">Completa la Palabra</h3>
                  <p className="text-gray-600 mb-4">
                    Observa las imágenes de animales y completa sus nombres 
                    adivinando las letras que faltan.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-yellow-500">
                      <Award className="h-5 w-5 mr-1" />
                      <span className="font-medium">+100 puntos</span>
                    </span>
                    <p
                      onClick={() => navigate('/completarPalabra')}
                      className="cursor-pointer px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-200 flex items-center"
                    >
                      Jugar Ahora
                      <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Tarjetas para juegos futuros (inactivas) */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-60">
                <div className="h-48 bg-purple-100 flex items-center justify-center p-4">
                  <svg
                    className="w-32 h-32 text-purple-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Busca Palabras</h3>
                  <p className="text-gray-400 mb-4">
                    Encuentra nombres de animales ocultos en una cuadrícula de letras.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-gray-400">
                      <Award className="h-5 w-5 mr-1" />
                      <span className="font-medium">Próximamente</span>
                    </span>
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-300 text-white rounded-lg cursor-not-allowed"
                    >
                      Próximamente
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-60">
                <div className="h-48 bg-purple-100 flex items-center justify-center p-4">
                  <svg
                    className="w-32 h-32 text-purple-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Quiz Ecológico</h3>
                  <p className="text-gray-400 mb-4">
                    Pon a prueba tus conocimientos sobre ecología y medio ambiente.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-gray-400">
                      <Award className="h-5 w-5 mr-1" />
                      <span className="font-medium">Próximamente</span>
                    </span>
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-300 text-white rounded-lg cursor-not-allowed"
                    >
                      Próximamente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Sección Beneficios */}
          <section className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-purple-800 mb-2">Beneficios de EcoAlfabeto</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nuestros juegos están diseñados para ayudar en el desarrollo de habilidades esenciales.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">Aprendizaje Divertido</h3>
                <p className="text-gray-600">
                  Los juegos hacen que el aprendizaje sea más atractivo y memorable, 
                  manteniendo a los estudiantes motivados.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">Mejora del Vocabulario</h3>
                <p className="text-gray-600">
                  Expande el vocabulario relacionado con la naturaleza y desarrolla 
                  habilidades lingüísticas fundamentales.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 14.5V16a2 2 0 01-2 2 2 2 0 01-2 2v0a2 2 0 01-2-2v-1.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">Conciencia Ecológica</h3>
                <p className="text-gray-600">
                  Fomenta el interés por el medio ambiente y promueve valores 
                  de conservación y respeto hacia la naturaleza.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Pie de Página */}
      <footer className="bg-purple-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">EcoAlfabeto</h3>
              <p className="text-purple-200">
                Educación interactiva sobre naturaleza y lenguaje para todas las edades.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-200 hover:text-white">Inicio</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white">Juegos</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white">Recursos</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white">Sobre Nosotros</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-purple-200">info@ecoalfabeto.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-purple-200">(123) 456-7890</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center hover:bg-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center hover:bg-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center hover:bg-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-purple-700 text-center">
            <p className="text-purple-300">
              © {new Date().getFullYear()} EcoAlfabeto. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}