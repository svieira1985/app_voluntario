import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eventos" element={<div className="container mx-auto px-4 py-8">Página de Eventos em construção</div>} />
          <Route path="/voluntario" element={<div className="container mx-auto px-4 py-8">Página de Voluntariado em construção</div>} />
          <Route path="/contato" element={<div className="container mx-auto px-4 py-8">Página de Contato em construção</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<div className="container mx-auto px-4 py-8">Página de Cadastro em construção</div>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <VolunteerDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div className="container mx-auto px-4 py-8">Página não encontrada</div>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
