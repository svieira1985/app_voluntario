import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertCircle, Check, UserPlus } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useToast } from '../../components/ui/use-toast';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    cpf: '',
    password: '',
    clown_name: '',
    birth_date: new Date(1990, 0, 1),
    is_admin: true
  });
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.detail || 'Erro ao carregar usuários.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/admin`, {
        ...newUser,
        birth_date: format(newUser.birth_date, 'yyyy-MM-dd')
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setSuccess('Usuário admin criado com sucesso!');
      toast({
        title: "Sucesso!",
        description: "Usuário admin criado com sucesso!",
        variant: "default",
      });
      
      setNewUser({
        full_name: '',
        email: '',
        cpf: '',
        password: '',
        clown_name: '',
        birth_date: new Date(1990, 0, 1),
        is_admin: true
      });
      setIsCreateDialogOpen(false);
      
      fetchUsers();
    } catch (err: any) {
      console.error('Error creating admin:', err);
      setError(err.response?.data?.detail || 'Erro ao criar usuário admin.');
    }
  };
  
  const toggleAdminStatus = async (userId: number, currentStatus: boolean) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        is_admin: !currentStatus
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast({
        title: "Sucesso!",
        description: `Status de admin ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`,
        variant: "default",
      });
      
      fetchUsers();
    } catch (err: any) {
      console.error('Error toggling admin status:', err);
      toast({
        title: "Erro!",
        description: err.response?.data?.detail || 'Erro ao alterar status de admin.',
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Admin</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleCreateAdmin} className="space-y-4 py-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input 
                    id="full_name" 
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input 
                    id="cpf" 
                    value={newUser.cpf}
                    onChange={(e) => setNewUser({...newUser, cpf: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="clown_name">Nome do Palhaço</Label>
                  <Input 
                    id="clown_name" 
                    value={newUser.clown_name}
                    onChange={(e) => setNewUser({...newUser, clown_name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Data de Nascimento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {format(newUser.birth_date, 'PPP', { locale: ptBR })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newUser.birth_date}
                        onSelect={(date) => date && setNewUser({...newUser, birth_date: date})}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">Criar Admin</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <p>Carregando usuários...</p>
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{user.full_name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${user.is_admin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.is_admin ? 'Admin' : 'Voluntário'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>CPF:</strong> {user.cpf}</p>
                  <p><strong>Nome do Palhaço:</strong> {user.clown_name}</p>
                  <p><strong>Data de Nascimento:</strong> {format(new Date(user.birth_date), 'PPP', { locale: ptBR })}</p>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                      variant="outline"
                      className="w-full"
                    >
                      {user.is_admin ? 'Remover Admin' : 'Tornar Admin'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
