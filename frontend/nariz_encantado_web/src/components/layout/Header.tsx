import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-yellow-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/images/image7.png" alt="Nariz Encantado" className="h-16 w-auto mr-2" />
            <span className="text-2xl font-bold text-yellow-500">Nariz Encantado</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#sobre" className="text-gray-700 hover:text-yellow-500 font-medium">
            Quem Somos
          </Link>
          <Link to="/#eventos" className="text-gray-700 hover:text-yellow-500 font-medium">
            Eventos
          </Link>
          <Link to="/#voluntario" className="text-gray-700 hover:text-yellow-500 font-medium">
            Seja Voluntário
          </Link>
          <Link to="/#depoimentos" className="text-gray-700 hover:text-yellow-500 font-medium">
            Depoimentos
          </Link>
          <Link to="/#contato" className="text-gray-700 hover:text-yellow-500 font-medium">
            Contato
          </Link>
        </nav>

        {/* Authentication Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-yellow-500"
                onClick={() => navigate('/dashboard')}
              >
                <User className="h-5 w-5 mr-2" />
                Minha Conta
              </Button>
              
              {isAdmin && (
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-yellow-500"
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-yellow-500"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-yellow-500"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={() => navigate('/register')}
              >
                Cadastre-se
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-yellow-500 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link 
              to="/#sobre" 
              className="block text-gray-700 hover:text-yellow-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </Link>
            <Link 
              to="/#eventos" 
              className="block text-gray-700 hover:text-yellow-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              to="/#voluntario" 
              className="block text-gray-700 hover:text-yellow-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Seja Voluntário
            </Link>
            <Link 
              to="/#depoimentos" 
              className="block text-gray-700 hover:text-yellow-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <Link 
              to="/#contato" 
              className="block text-gray-700 hover:text-yellow-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>

            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-700 hover:text-yellow-500"
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Minha Conta
                  </Button>
                  
                  {isAdmin && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-700 hover:text-yellow-500"
                      onClick={() => {
                        navigate('/admin');
                        setIsMenuOpen(false);
                      }}
                    >
                      Admin
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-700 hover:text-yellow-500"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-700 hover:text-yellow-500"
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                  >
                    Cadastre-se
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
