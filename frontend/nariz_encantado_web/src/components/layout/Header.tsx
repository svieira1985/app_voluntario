import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-primary py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.svg" alt="Nariz Encantado" className="h-12 w-12 mr-3" />
          <span className="text-2xl font-bold text-primary-foreground">Nariz Encantado</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#sobre" onClick={(e) => { e.preventDefault(); scrollToSection('sobre'); }} className="text-primary-foreground hover:text-gray-800 cursor-pointer">Sobre</a></li>
            <li><a href="#eventos" onClick={(e) => { e.preventDefault(); scrollToSection('eventos'); }} className="text-primary-foreground hover:text-gray-800 cursor-pointer">Eventos</a></li>
            <li><Link to="/login" className="text-primary-foreground hover:text-gray-800">Seja Voluntário</Link></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToFooter(); }} className="text-primary-foreground hover:text-gray-800 cursor-pointer">Contato</a></li>
            <li><Link to="/login" className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-hover">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
