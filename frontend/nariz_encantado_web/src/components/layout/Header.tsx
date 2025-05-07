import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Heart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-2xl font-bold text-red-600">Nariz Encantado</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-red-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#sobre" className="text-gray-700 hover:text-red-600 font-medium">
            Sobre
          </Link>
          <Link to="/#eventos" className="text-gray-700 hover:text-red-600 font-medium">
            Eventos
          </Link>
          <Link to="/#voluntario" className="text-gray-700 hover:text-red-600 font-medium">
            Seja Voluntário
          </Link>
          <Link to="/#contato" className="text-gray-700 hover:text-red-600 font-medium">
            Contato
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  Minha Área
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-red-600"
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-red-600 text-white hover:bg-red-700">
                  Cadastro
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              to="/#sobre" 
              className="text-gray-700 hover:text-red-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              to="/#eventos" 
              className="text-gray-700 hover:text-red-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              to="/#voluntario" 
              className="text-gray-700 hover:text-red-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Seja Voluntário
            </Link>
            <Link 
              to="/#contato" 
              className="text-gray-700 hover:text-red-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3 py-2">
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    Minha Área
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-700 hover:text-red-600"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 py-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                    Cadastro
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
