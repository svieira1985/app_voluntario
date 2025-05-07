import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useAuth } from '../../contexts/AuthContext';
import DocumentUpload from '../../components/volunteer/DocumentUpload';
import { getUserProfile, getEvents } from '../../services/api';

const VolunteerDashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [participationHistory, setParticipationHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const profileResponse = await getUserProfile();
        setUserProfile(profileResponse.data);
        
        setRegisteredEvents([]);
        setParticipationHistory([]);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Área do Voluntário</h1>
        <Button onClick={handleLogout} variant="outline" className="bg-secondary text-white hover:bg-secondary-hover">Sair</Button>
      </div>
      
      {userProfile && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Nome Completo</p>
                <p className="text-lg">{userProfile.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Nome do Palhaço</p>
                <p className="text-lg">{userProfile.clownName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">E-mail</p>
                <p className="text-lg">{userProfile.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">CPF</p>
                <p className="text-lg">{userProfile.cpf}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="events">Eventos Inscritos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Eventos Inscritos</CardTitle>
              <CardDescription>Eventos que você está inscrito para participar</CardDescription>
            </CardHeader>
            <CardContent>
              {registeredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {registeredEvents.map(event => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.name}</CardTitle>
                        <CardDescription>{event.date} - {event.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{event.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" onClick={() => navigate(`/events/${event.id}`)}>
                          Ver Detalhes
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8">Você não está inscrito em nenhum evento no momento.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/events')} className="w-full bg-secondary text-white hover:bg-secondary-hover">
                Ver Todos os Eventos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Gerencie seus documentos</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentUpload />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Participação</CardTitle>
              <CardDescription>Eventos que você já participou</CardDescription>
            </CardHeader>
            <CardContent>
              {participationHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {participationHistory.map(event => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.name}</CardTitle>
                        <CardDescription>{event.date} - {event.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{event.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8">Você ainda não participou de nenhum evento.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteerDashboard;
