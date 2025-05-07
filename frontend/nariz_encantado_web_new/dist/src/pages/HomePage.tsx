import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Heart, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  const events = [
    {
      id: 1,
      name: 'Visita ao Hospital Infantil',
      date_time: '2025-05-15T14:00:00',
      location: 'Hospital Infantil São Paulo',
      available_spots: 5,
      total_spots: 10,
      image: '/images/image13.jpeg'
    },
    {
      id: 2,
      name: 'Festa das Crianças',
      date_time: '2025-05-20T10:00:00',
      location: 'Orfanato Luz da Esperança',
      available_spots: 3,
      total_spots: 8,
      image: '/images/image14.jpeg'
    },
    {
      id: 3,
      name: 'Visita ao Asilo',
      date_time: '2025-05-25T15:00:00',
      location: 'Asilo Bem Viver',
      available_spots: 0,
      total_spots: 6,
      image: '/images/image21.jpeg'
    }
  ];
  
  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Voluntária',
      text: 'Ser voluntária no Nariz Encantado mudou minha vida. Ver o sorriso das crianças é uma experiência transformadora que me faz querer continuar nessa jornada de amor e alegria.',
      image: '/images/image5.jpeg'
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Voluntário',
      text: 'Participar do Nariz Encantado me mostrou como pequenos gestos podem fazer uma grande diferença. A energia e o carinho que recebemos de volta são indescritíveis.',
      image: '/images/image6.jpeg'
    },
    {
      id: 3,
      name: 'Ana Oliveira',
      role: 'Enfermeira',
      text: 'Os palhaços do Nariz Encantado trazem uma energia especial para o hospital. Os pacientes ficam mais animados e isso contribui muito para o processo de recuperação.',
      image: '/images/image1.jpeg'
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-yellow-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Nariz Encantado
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Criamos momentos alegres e inesquecíveis
              </h2>
              <p className="text-lg mb-8">
                Transformando vidas através da magia do palhaço, levando sorrisos e alegria para quem mais precisa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-white text-yellow-500 hover:bg-yellow-100"
                  onClick={() => {
                    const element = document.getElementById('eventos');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Ver Eventos
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-yellow-500"
                  onClick={() => {
                    const element = document.getElementById('voluntario');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Seja Voluntário
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/images/logo.png" 
                alt="Nariz Encantado" 
                className="max-w-full h-auto max-h-80"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Quem Somos Section */}
      <section id="sobre" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-yellow-500 mb-6">Quem Somos</h2>
              <p className="text-lg text-gray-700 mb-6">
                Nossa missão é levar alegria e felicidade através da magia do palhaço, com amor, respeito e encantamento. Buscamos transformar momentos e criar memórias acolhedoras, capazes de curar e iluminar o dia das pessoas, trazendo sorrisos e momentos inesquecíveis para todos.
              </p>
              <p className="text-lg text-gray-700">
                Fundado em 2015, o Nariz Encantado já realizou mais de 500 visitas e eventos, impactando positivamente a vida de milhares de pessoas em hospitais, asilos, orfanatos e comunidades carentes.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/image9.png" 
                alt="Palhaços em ação" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Nossos Valores Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yellow-500 mb-12 text-center">Nossos Valores</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Magia</h3>
              <p className="text-gray-700">
                Acreditamos no poder transformador da magia do palhaço, capaz de criar momentos especiais e inesquecíveis.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Alegria</h3>
              <p className="text-gray-700">
                Levamos alegria e sorrisos para todos os lugares, transformando ambientes e criando experiências positivas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sensibilidade</h3>
              <p className="text-gray-700">
                Atuamos com sensibilidade para entender as necessidades de cada pessoa e adaptar nossa abordagem.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Empatia</h3>
              <p className="text-gray-700">
                Colocamo-nos no lugar do outro, compreendendo suas emoções e necessidades para criar conexões genuínas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Amor</h3>
              <p className="text-gray-700">
                Agimos com amor em tudo o que fazemos, criando um ambiente acolhedor e cheio de carinho para todos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Respeito</h3>
              <p className="text-gray-700">
                Respeitamos a individualidade e dignidade de cada pessoa, valorizando a diversidade e inclusão.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Próximos Eventos Section */}
      <section id="eventos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yellow-500 mb-12 text-center">Próximos Eventos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{event.name}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>{formatDate(event.date_time)} às {formatTime(event.date_time)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>
                        {event.available_spots} vagas disponíveis de {event.total_spots}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      event.available_spots > 0 
                        ? 'bg-yellow-500 hover:bg-yellow-600' 
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    disabled={event.available_spots === 0}
                    onClick={() => {
                      if (!isAuthenticated) {
                        window.location.href = `/login?redirect=/event/${event.id}`;
                      } else {
                        window.location.href = `/event/${event.id}`;
                      }
                    }}
                  >
                    {event.available_spots > 0 ? 'Inscreva-se' : 'Sem vagas disponíveis'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/events">
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-50">
                Ver Todos os Eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Seja Voluntário Section */}
      <section id="voluntario" className="py-16 bg-yellow-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-6">Seja um Voluntário</h2>
              <p className="text-lg mb-6">
                Junte-se a nós e faça a diferença na vida de muitas pessoas! Ser um voluntário do Nariz Encantado é uma experiência transformadora que traz alegria não só para quem recebe, mas também para quem doa seu tempo e talento.
              </p>
              <h3 className="text-xl font-bold mb-4">Benefícios de ser voluntário:</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-yellow-500" />
                  </div>
                  <span>Impactar positivamente a vida de pessoas em situação de vulnerabilidade</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-yellow-500" />
                  </div>
                  <span>Desenvolver habilidades de comunicação e trabalho em equipe</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-yellow-500" />
                  </div>
                  <span>Participar de treinamentos e workshops exclusivos</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4 text-yellow-500" />
                  </div>
                  <span>Fazer parte de uma comunidade de pessoas engajadas e apaixonadas</span>
                </li>
              </ul>
              <Button 
                className="bg-white text-yellow-500 hover:bg-yellow-100"
                onClick={() => window.location.href = '/register'}
              >
                Quero me Voluntariar
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/image11.png" 
                alt="Voluntários em ação" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yellow-500 mb-12 text-center">Depoimentos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                  <p className="text-gray-700 text-center italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Nossos Voluntários Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yellow-500 mb-12 text-center">Nossos Voluntários</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/images/image5.jpeg" 
                  alt="Voluntário" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center">Palhaço Pipoca</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/images/image6.jpeg" 
                  alt="Voluntário" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center">Palhaça Florzinha</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/images/image1.jpeg" 
                  alt="Voluntário" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center">Palhaço Bolinha</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/images/image21.jpeg" 
                  alt="Voluntário" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center">Palhaça Estrela</h3>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-6">
              Nossos voluntários são pessoas dedicadas e apaixonadas que doam seu tempo e talento para levar alegria e sorrisos a quem mais precisa.
            </p>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => window.location.href = '/register'}
            >
              Junte-se a Nós
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
