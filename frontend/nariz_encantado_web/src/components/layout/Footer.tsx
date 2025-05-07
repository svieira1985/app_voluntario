import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Nariz Encantado</h3>
            <p className="text-sm">Nossa missão é levar alegria e felicidade através da magia do palhaço, com amor, respeito e encantamento.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="text-sm space-y-2">
              <li>Email: contato@narizencantado.org</li>
              <li>Telefone: (11) 9999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-red-200">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-red-200">
                Instagram
              </a>
              <a href="#" className="text-white hover:text-red-200">
                YouTube
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-red-500 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nariz Encantado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
