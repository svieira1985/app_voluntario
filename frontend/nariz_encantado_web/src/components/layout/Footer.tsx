import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-yellow-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <img src="/images/image7.png" alt="Nariz Encantado" className="h-12 w-auto mr-2" />
              <span className="text-2xl font-bold">Nariz Encantado</span>
            </div>
            <p className="text-center md:text-left">
              Levando alegria e felicidade através da magia do palhaço, com amor, respeito e encantamento.
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>São Paulo, SP</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(11) 97862-4664</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>secretaria@narizencantado.com.br</span>
              </div>
            </div>
          </div>

          {/* Social Media and Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://instagram.com/nariz.encantado" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-yellow-500 p-2 rounded-full hover:bg-yellow-100 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://facebook.com/narizencantado" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-yellow-500 p-2 rounded-full hover:bg-yellow-100 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://youtube.com/narizencantado" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-yellow-500 p-2 rounded-full hover:bg-yellow-100 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/#sobre" className="hover:underline">Quem Somos</Link>
              <Link to="/#eventos" className="hover:underline">Eventos</Link>
              <Link to="/#voluntario" className="hover:underline">Seja Voluntário</Link>
              <Link to="/#depoimentos" className="hover:underline">Depoimentos</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Nariz Encantado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
