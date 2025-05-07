import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { eventService } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, MapPin, Users, Check, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Alert, AlertDescription } from '../components/ui/alert';

interface Event {
  id: number;
  name: string;
  date_time: string;
  location: string;
  description: string;
  available_spots: number;
  total_spots: number;
  image_path: string;
}

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!eventId) return;
        const data = await eventService.getEvent(parseInt(eventId));
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Não foi possível carregar os detalhes do evento.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: `/event/${eventId}` } });
      return;
    }

    if (!event) return;

    setIsRegistering(true);
    setError('');

    try {
      await eventService.registerForEvent(event.id);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao se inscrever no evento. Tente novamente.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600">Carregando detalhes do evento...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Evento não encontrado</h1>
        <p className="text-lg text-gray-600 mb-6">O evento que você está procurando não existe ou foi removido.</p>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() => navigate('/')}
        >
          Voltar para a página inicial
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-red-600 hover:text-red-700 mb-4"
            onClick={() => navigate('/')}
          >
            ← Voltar para eventos
          </Button>
          <h1 className="text-3xl font-bold text-red-600 mb-2">{event.name}</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Inscrição realizada com sucesso! Você receberá mais informações por e-mail.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <div className="h-64 overflow-hidden">
                <img 
                  src={event.image_path || "https://images.unsplash.com/photo-1527224857830-43a7acc85260"} 
                  alt={event.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Detalhes do Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{format(new Date(event.date_time), "PPP 'às' HH:mm", { locale: ptBR })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.available_spots} vagas disponíveis de {event.total_spots}</span>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Descrição</h3>
                  <p className="text-gray-700">{event.description || "Junte-se a nós neste evento especial onde levaremos alegria e sorrisos para quem mais precisa. Venha fazer parte desta experiência transformadora!"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Inscrição</CardTitle>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="text-center py-4">
                    <Check className="h-12 w-12 mx-auto text-green-600 mb-4" />
                    <p className="text-lg font-medium mb-2">Inscrição Confirmada!</p>
                    <p className="text-gray-600 mb-4">Você está inscrito neste evento.</p>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => navigate('/dashboard')}
                    >
                      Ver Meus Eventos
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-6">
                      {event.available_spots > 0 
                        ? `Restam ${event.available_spots} vagas para este evento. Inscreva-se agora para garantir sua participação!` 
                        : "Todas as vagas para este evento já foram preenchidas."}
                    </p>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={event.available_spots === 0 || isRegistering}
                      onClick={handleRegister}
                    >
                      {isRegistering ? 'Processando...' : 'Inscrever-se'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
