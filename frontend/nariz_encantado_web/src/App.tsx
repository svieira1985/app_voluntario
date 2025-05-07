import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Other routes will be added here */}
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
