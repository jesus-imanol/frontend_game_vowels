import { useState, useEffect } from 'react';
import { Code, MessageCircle, ThumbsUp, Share2, Users, Bell, Laptop, Database, Server } from 'lucide-react';

export default function IngecodeSocialInterface() {
  const teamMembers = [
    {
      id: 1,
      name: "Jesús Imanol Castillo Avendaña",
      role: "Desarrollador Full Stack",
      profileImage: "/api/placeholder/300/300",
      healthImage: "/api/placeholder/300/300",
      likes: 128,
      comments: 32,
      status: "Disponible"
    },
    {
      id: 3,
      name: "David Reynold Guzman Castro",
      role: "Ingeniero de Software",
      profileImage: "/api/placeholder/300/300",
      healthImage: "/api/placeholder/300/300",
      likes: 156,
      comments: 45,
      status: "Trabajando"
    },
    {
      id: 2,
      name: "Hector Somer Gay",
      role: "Back-end",
      profileImage: "/api/placeholder/300/300",
      healthImage: "/api/placeholder/300/300",
      likes: 98,
      comments: 27,
      status: "Cagando"
    }
  ];

  const [hoveredMember, setHoveredMember] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPulse, setShowPulse] = useState({});

  useEffect(() => {
    // Iniciar animación de pulso para cada miembro secuencialmente
    teamMembers.forEach((member, index) => {
      setTimeout(() => {
        setShowPulse(prev => ({...prev, [member.id]: true}));
        
        // Quitar el pulso después de 2 segundos
        setTimeout(() => {
          setShowPulse(prev => ({...prev, [member.id]: false}));
        }, 2000);
      }, 800 * index);
    });

    // Cambiar miembro activo cada 5 segundos
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const iconPositions = [
    { top: '15%', left: '5%', rotate: '5deg', delay: '0s' },
    { top: '30%', right: '8%', rotate: '-10deg', delay: '1s' },
    { top: '55%', left: '12%', rotate: '15deg', delay: '2s' },
    { top: '70%', right: '15%', rotate: '-5deg', delay: '3s' },
    { top: '40%', left: '18%', rotate: '8deg', delay: '4s' },
    { top: '20%', right: '20%', rotate: '-12deg', delay: '5s' }
  ];

  const codeSnippets = [
    '<div className="rounded-full">',
    'function Ingecode() {',
    'const health = new API();',
    'return <Avatar user={team} />;',
    'import { useState } from "react";',
    '@media (min-width: 768px) {'
  ];

  // Determinar estado para indicador visual
  const getStatusColor = (status) => {
    switch(status) {
      case "Disponible": return "bg-green-500";
      case "Trabajando": return "bg-yellow-500";
      case "En reunión": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4 md:p-8 relative overflow-hidden">
      {/* Elementos decorativos flotantes */}
      {iconPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute z-0 opacity-10 text-purple-700 animate-float"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            transform: `rotate(${pos.rotate})`,
            animationDelay: pos.delay
          }}
        >
          {index % 3 === 0 ? (
            <Laptop className="w-16 h-16 md:w-24 md:h-24" />
          ) : index % 3 === 1 ? (
            <Database className="w-16 h-16 md:w-24 md:h-24" />
          ) : (
            <Server className="w-16 h-16 md:w-24 md:h-24" />
          )}
        </div>
      ))}

      {/* Fragmentos de código flotantes */}
      {codeSnippets.map((snippet, index) => (
        <div
          key={`code-${index}`}
          className="absolute z-0 opacity-5 font-mono text-xs md:text-sm text-purple-900 whitespace-nowrap animate-float"
          style={{
            top: `${15 + (index * 12)}%`,
            left: index % 2 === 0 ? '30%' : '60%',
            transform: `rotate(${index % 2 === 0 ? 5 : -5}deg)`,
            animationDelay: `${index * 0.8}s`,
            animationDuration: '15s'
          }}
        >
          {snippet}
        </div>
      ))}

      {/* Header Redondeado */}
      <header className="sticky top-0 z-40 mb-8 backdrop-blur-md bg-white/60 rounded-full shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-full py-3 px-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-2 group">
              <div className="bg-white p-2 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                <Code className="w-6 h-6 text-purple-700" />
              </div>
              <h1 className="text-2xl font-bold">ingecode</h1>
            </div>
            <div className="hidden md:flex items-center">
              <button className="relative px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200">
                <Users className="w-5 h-5" />
              </button>
              <button className="relative px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Columna de Avatares (Izquierda) */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-600 text-center">Nuestro Equipo</h2>
            
            <div className="flex flex-col items-center space-y-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id} 
                  className={`flex flex-col items-center transition-all duration-300 transform ${activeIndex === index ? 'scale-105' : 'scale-100'}`}
                >
                  <div className="relative group">
                    <div 
                      className={`w-32 h-32 rounded-full overflow-hidden cursor-pointer border-4 ${activeIndex === index ? 'border-purple-600' : 'border-purple-300'} transition-all duration-500 shadow-lg ${showPulse[member.id] ? 'animate-pulse' : ''}`}
                      onMouseEnter={() => setHoveredMember(member.id)}
                      onMouseLeave={() => setHoveredMember(null)}
                      onClick={() => setActiveIndex(index)}
                    >
                      <img 
                        src={hoveredMember === member.id ? member.healthImage : member.profileImage} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Halo de luz alrededor del avatar */}
                    <div className={`absolute -inset-2 bg-purple-300 rounded-full opacity-0 ${activeIndex === index ? 'opacity-20' : ''} group-hover:opacity-20 blur-md transition-opacity duration-500 -z-10`}></div>
                    
                    {/* Indicador de estado */}
                    <div className={`absolute bottom-1 right-1 w-5 h-5 ${getStatusColor(member.status)} rounded-full border-2 border-white shadow-md`}></div>
                    
                    {/* Círculos decorativos */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-purple-400 rounded-full opacity-80 shadow-md flex items-center justify-center text-white font-bold">
                      <Code className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <h3 className="text-base font-bold text-purple-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{member.status}</p>
                    
                    <div className="flex justify-center space-x-3 mt-2">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-purple-700 transition-colors duration-200">
                        <ThumbsUp className="w-3 h-3" />
                        <span className="text-xs">{member.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-purple-700 transition-colors duration-200">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-xs">{member.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-purple-700 transition-colors duration-200">
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Separador después de cada miembro excepto el último */}
                  {index < teamMembers.length - 1 && (
                    <div className="w-16 h-0.5 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contenido Principal (Derecha) */}
        <div className="md:col-span-8 lg:col-span-9">
          {/* Company Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 rounded-3xl mb-8 shadow-xl transition-all duration-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] opacity-10 bg-center bg-cover mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-3">Bienvenido a Ingecode</h2>
              <p className="text-lg text-purple-100 max-w-2xl">Innovando en tecnología y salud para un futuro mejor</p>
              <button className="mt-4 px-6 py-2 bg-white text-purple-700 rounded-full font-medium hover:bg-purple-50 transition-colors duration-300 shadow-md flex items-center gap-2">
                <span>Conoce más</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Recent Project */}
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-100 rounded-full opacity-50"></div>
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-100 rounded-full opacity-50"></div>
            
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-600">Nuestro Último Proyecto</h2>
            
            <div className="flex flex-col gap-6 relative z-10">
              <div className="w-full rounded-3xl overflow-hidden shadow-lg">
                <img src="/salud.jpg" alt="Proyecto reciente" className="w-full h-auto" />
              </div>
              
              <div className="w-full">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Sistema de Monitoreo de Salud</h3>
                <p className="text-gray-700 mb-4">Una solución integral desarrollada por nuestro equipo que permite monitorear signos vitales en tiempo real con tecnología avanzada y una interfaz intuitiva. La plataforma cuenta con análisis de datos mediante IA y conectividad con dispositivos IoT.</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Salud</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">AI</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">IoT</span>
                </div>
                
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full hover:shadow-lg transition-all duration-300">
                  Explorar proyecto
                </button>
              </div>
            </div>
          </div>
          
          {/* Updates Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-600">Actualizaciones</h2>
            
            <div className="space-y-6">
              {teamMembers.map((member) => (
                <div key={`update-${member.id}`} className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                      <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-bold text-purple-900">{member.name}</p>
                        <span className="text-xs text-gray-500 ml-2">• hace {member.id * 2} horas</span>
                      </div>
                      
                      <p className="text-gray-700 my-2">
                        {member.id === 1 
                          ? "Acabo de terminar la integración del nuevo módulo de análisis de datos para nuestro sistema de monitoreo. ¡Los resultados son prometedores!" 
                          : member.id === 2 
                            ? "He optimizado el algoritmo para reducir el tiempo de procesamiento en un 40%. La eficiencia es clave para nuestras aplicaciones en tiempo real."
                            : "El nuevo diseño de la interfaz de usuario ha sido implementado. Los usuarios ahora pueden acceder a toda la información con menos clics."
                        }
                      </p>
                      
                      {member.id === 1 && (
                        <div className="mt-3 mb-4 bg-purple-50 rounded-xl overflow-hidden">
                          <img src="/data.jpg" alt="Actualización" className="w-full h-auto" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 mt-3 pt-2 border-t border-purple-100">
                        <button className="text-gray-500 hover:text-purple-700 flex items-center gap-1 transition-colors duration-200">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{10 + member.id * 5}</span>
                        </button>
                        <button className="text-gray-500 hover:text-purple-700 flex items-center gap-1 transition-colors duration-200">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{2 + member.id}</span>
                        </button>
                        <button className="text-gray-500 hover:text-purple-700 flex items-center gap-1 transition-colors duration-200">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 pt-6 text-center text-gray-600">
        <div className="w-24 h-1 bg-gradient-to-r from-purple-300 to-purple-600 rounded-full mx-auto mb-6"></div>
        <p>© 2025 Ingecode. Todos los derechos reservados.</p>
      </footer>
      
      {/* Estilo para la animación de flotación */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}