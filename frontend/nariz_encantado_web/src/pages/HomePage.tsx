import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { eventService } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Heart, Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Event {
  id: number;
  name: string;
  date_time: string;
  location: string;
  available_spots: number;
  total_spots: number;
  image_path: string;
}

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Voluntária há 3 anos',
    content: 'Ser voluntária no Nariz Encantado mudou minha vida. Ver o sorriso das crianças é a melhor recompensa que poderia receber.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Voluntário há 1 ano',
    content: 'Nunca imaginei que poderia fazer tanta diferença na vida das pessoas apenas levando alegria. É uma experiência transformadora.',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 3,
    name: 'Ana Oliveira',
    role: 'Mãe de paciente',
    content: 'Os palhaços do Nariz Encantado trouxeram luz para os dias difíceis do meu filho no hospital. Sou eternamente grata pelo trabalho de vocês.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
];

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventRegistration = (eventId: number) => {
    if (isAuthenticated) {
      navigate(`/event/${eventId}`);
    } else {
      navigate('/login', { state: { redirectTo: `/event/${eventId}` } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nariz Encantado</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Levando alegria e felicidade através da magia do palhaço
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button className="bg-yellow-400 text-red-600 hover:bg-yellow-300 font-bold text-lg px-6 py-3">
                Seja Voluntário
              </Button>
            </Link>
            <a href="#eventos">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 font-bold text-lg px-6 py-3">
                Ver Eventos
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-red-600 mb-6">Sobre Nós</h2>
              <p className="text-lg text-gray-700 mb-6">
                Nossa missão é levar alegria e felicidade através da magia do palhaço, com amor, respeito e encantamento. Buscamos transformar momentos e criar memórias inesquecíveis.
              </p>
              <p className="text-lg text-gray-700">
                Fundado em 2015, o Nariz Encantado já impactou mais de 10.000 pessoas em hospitais, asilos, orfanatos e comunidades carentes. Nossos voluntários são treinados para levar sorrisos e esperança onde mais se precisa.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1573511860302-28c11ff28615" 
                alt="Palhaços em ação" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Próximos Eventos</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Carregando eventos...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhum evento disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image_path || "https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                      alt={event.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600">{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
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
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleEventRegistration(event.id)}
                    >
                      Inscreva-se
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="voluntario" className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Seja um Voluntário</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Junte-se a nós e faça a diferença na vida de muitas pessoas!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white/10 p-6 rounded-lg">
              <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Espalhe Alegria</h3>
              <p>Leve sorrisos e momentos de felicidade para quem mais precisa.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Cresça Pessoalmente</h3>
              <p>Desenvolva habilidades sociais, empatia e criatividade.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Faça Parte</h3>
              <p>Integre uma comunidade de pessoas comprometidas com o bem.</p>
            </div>
          </div>
          
          <Link to="/register">
            <Button className="bg-yellow-400 text-red-600 hover:bg-yellow-300 font-bold text-lg px-8 py-3">
              Quero me Voluntariar
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Depoimentos</h2>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="p-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-24 h-24 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-lg italic mb-4">"{testimonial.content}"</p>
                            <div>
                              <p className="font-bold text-red-600">{testimonial.name}</p>
                              <p className="text-gray-600">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
