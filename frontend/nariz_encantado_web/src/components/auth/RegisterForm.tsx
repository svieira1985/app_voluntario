import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    clown_name: '',
    email: '',
    cpf: '',
    birth_date: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    if (formData.password !== formData.confirm_password) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }
    
    try {
      setTimeout(() => {
        setSuccess('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
        setIsLoading(false);
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Falha ao realizar cadastro. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Voluntário</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Nome Completo</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clown_name">Nome do Palhaço</Label>
          <Input
            id="clown_name"
            name="clown_name"
            value={formData.clown_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth_date">Data de Nascimento</Label>
          <Input
            id="birth_date"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm_password">Confirmar Senha</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <a href="/login" className="text-red-600 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
