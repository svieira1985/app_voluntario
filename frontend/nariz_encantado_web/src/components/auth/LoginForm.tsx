import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(credentials.email, credentials.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email ou CPF</Label>
          <Input
            id="email"
            name="email"
            type="text"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Senha</Label>
            <a href="/recover-password" className="text-sm text-red-600 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="/register" className="text-red-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
