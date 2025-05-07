import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-primary py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.svg" alt="Nariz Encantado" className="h-12 w-12 mr-3" />
          <span className="text-2xl font-bold text-primary-foreground">Nariz Encantado</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-primary-foreground hover:text-gray-800">Sobre</Link></li>
            <li><Link to="/eventos" className="text-primary-foreground hover:text-gray-800">Eventos</Link></li>
            <li><Link to="/voluntario" className="text-primary-foreground hover:text-gray-800">Seja Voluntário</Link></li>
            <li><Link to="/contato" className="text-primary-foreground hover:text-gray-800">Contato</Link></li>
            <li><Link to="/login" className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-hover">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
