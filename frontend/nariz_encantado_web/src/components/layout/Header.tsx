import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Nariz Encantado</Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-red-200">Início</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard" className="hover:text-red-200">Meus Eventos</Link></li>
                {isAdmin && (
                  <>
                    <li><Link to="/admin" className="hover:text-red-200">Admin</Link></li>
                    <li><Link to="/financial" className="hover:text-red-200">Financeiro</Link></li>
                  </>
                )}
                <li>
                  <button 
                    onClick={logout} 
                    className="hover:text-red-200"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-red-200">Login</Link></li>
                <li><Link to="/register" className="hover:text-red-200">Cadastro</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
