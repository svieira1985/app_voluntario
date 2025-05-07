import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <section className="hero-section text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nariz Encantado</h1>
          <p className="text-xl mb-8">Criamos momentos alegres e inesquecíveis</p>
          <p className="text-lg mb-10 max-w-2xl mx-auto">
            Nossa missão é levar alegria e felicidade através da magia do palhaço, com amor, respeito e encantamento.
          </p>
          <Link 
            to="/register" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Seja um Voluntário
          </Link>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 section-title">Próximos Eventos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Visita ao Hospital</h3>
                <p className="text-gray-600 mb-4">12 de Junho, 2025 • 14:00</p>
                <p className="text-gray-700 mb-4">Hospital São Paulo</p>
                <p className="text-sm text-gray-500 mb-4">10 vagas disponíveis</p>
                <Link 
                  to="/login" 
                  className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Inscreva-se
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Festa das Crianças</h3>
                <p className="text-gray-600 mb-4">20 de Junho, 2025 • 10:00</p>
                <p className="text-gray-700 mb-4">Escola Municipal</p>
                <p className="text-sm text-gray-500 mb-4">5 vagas disponíveis</p>
                <Link 
                  to="/login" 
                  className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Inscreva-se
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Ação Social</h3>
                <p className="text-gray-600 mb-4">5 de Julho, 2025 • 09:00</p>
                <p className="text-gray-700 mb-4">Praça Central</p>
                <p className="text-sm text-gray-500 mb-4">15 vagas disponíveis</p>
                <Link 
                  to="/login" 
                  className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Inscreva-se
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
