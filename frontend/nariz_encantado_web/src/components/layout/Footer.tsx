import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-white mr-2" />
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
                <span>Rua das Flores, 123 - São Paulo, SP</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(11) 98765-4321</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contato@narizencantado.org</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-red-600 p-2 rounded-full hover:bg-yellow-300 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-red-600 p-2 rounded-full hover:bg-yellow-300 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-red-600 p-2 rounded-full hover:bg-yellow-300 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} Nariz Encantado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
