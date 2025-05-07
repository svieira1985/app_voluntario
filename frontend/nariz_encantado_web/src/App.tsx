import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import EventDetail from './pages/EventDetail';
import FinancialDashboard from './pages/FinancialDashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import PasswordRecoveryForm from './components/auth/PasswordRecoveryForm';
import { Toaster } from './components/ui/toaster';
import './App.css';

const ProtectedRoute: React.FC<{ element: React.ReactNode; adminOnly?: boolean }> = ({ 
  element, 
  adminOnly = false 
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{element}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<div className="container mx-auto px-4 py-12"><LoginForm /></div>} />
              <Route path="/register" element={<div className="container mx-auto px-4 py-12"><RegisterForm /></div>} />
              <Route path="/reset-password" element={<div className="container mx-auto px-4 py-12"><PasswordRecoveryForm /></div>} />
              <Route path="/event/:eventId" element={<EventDetail />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={<ProtectedRoute element={<Dashboard />} />} 
              />
              
              {/* Admin routes */}
              <Route 
                path="/financial" 
                element={<ProtectedRoute element={<FinancialDashboard />} adminOnly={true} />} 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
