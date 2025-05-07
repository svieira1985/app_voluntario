import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { AlertCircle, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '../contexts/AuthContext';
import { eventService } from '../services/api';

const EventRegistration: React.FC = () => {
  const { registrationLink } = useParams<{ registrationLink: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  
  useEffect(() => {
    const fetchEvent = async () => {
      if (!registrationLink) return;
      
      try {
        setLoading(true);
        const eventData = await eventService.getEventByRegistrationLink(registrationLink);
        setEvent(eventData);
      } catch (err: any) {
        console.error('Error fetching event:', err);
        setError(err.response?.data?.detail || 'Erro ao carregar evento.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [registrationLink]);
  
  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/event/register/${registrationLink}`);
      return;
    }
    
    if (!event) return;
    
    try {
      await eventService.registerForEvent(event.id);
      setRegistrationSuccess(true);
      setRegistrationError('');
      
      const updatedEvent = await eventService.getEventByRegistrationLink(registrationLink || '');
      setEvent(updatedEvent);
    } catch (err: any) {
      console.error('Error registering for event:', err);
      setRegistrationError(err.response?.data?.detail || 'Erro ao se inscrever no evento.');
      setRegistrationSuccess(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p>Carregando evento...</p>
        </div>
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Evento não encontrado ou link de inscrição inválido.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="bg-red-600 text-white">
          <CardTitle className="text-2xl">{event.name}</CardTitle>
          <CardDescription className="text-white opacity-90">
            Inscrição para Evento
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {registrationSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertDescription className="text-green-600">
                Inscrição realizada com sucesso! Você está confirmado para este evento.
              </AlertDescription>
            </Alert>
          )}
          
          {registrationError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{registrationError}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Data e Hora</h3>
                <p>{format(new Date(event.date_time), "PPP 'às' HH:mm", { locale: ptBR })}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Local</h3>
                <p>{event.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Vagas</h3>
                <p>{event.available_spots} disponíveis de {event.total_spots} totais</p>
              </div>
            </div>
            
            {event.description && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Descrição</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Voltar
          </Button>
          
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleRegister}
            disabled={event.available_spots === 0 || registrationSuccess}
          >
            {registrationSuccess 
              ? 'Inscrito' 
              : event.available_spots === 0 
                ? 'Sem vagas disponíveis' 
                : 'Inscrever-se'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventRegistration;
