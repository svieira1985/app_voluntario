import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await login(identifier, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setResetSuccess(true);
    } catch (err) {
      setError('Não foi possível processar sua solicitação. Por favor, tente novamente.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (forgotPassword) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Recuperar Senha</CardTitle>
            <CardDescription className="text-center">
              Informe seu e-mail para receber instruções de recuperação de senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resetSuccess ? (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertDescription>
                  Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleForgotPassword}>
                {error && (
                  <Alert className="mb-4 bg-red-50 border-red-200">
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-secondary-hover text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar instruções'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="link" 
              onClick={() => {
                setForgotPassword(false);
                setResetSuccess(false);
                setError('');
              }}
            >
              Voltar para login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login de Voluntário</CardTitle>
          <CardDescription className="text-center">
            Entre com seu e-mail/CPF e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            {error && (
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">E-mail ou CPF</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="seu@email.com ou 000.000.000-00"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Button 
                    variant="link" 
                    className="px-0 font-normal text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setForgotPassword(true);
                    }}
                  >
                    Esqueci minha senha
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary-hover text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm">
            Ainda não é voluntário?{' '}
            <Link to="/register" className="text-secondary hover:text-secondary-hover font-semibold">
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
