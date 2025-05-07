import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const events = [
    {
      id: 1,
      name: 'Visita ao Hospital Infantil',
      date: '15/05/2025',
      time: '14:00',
      location: 'Hospital Infantil São Paulo',
      availableSlots: 10,
      image: 'https://placehold.co/600x400/red/white?text=Evento+Hospital'
    },
    {
      id: 2,
      name: 'Festa Comunitária',
      date: '20/05/2025',
      time: '10:00',
      location: 'Centro Comunitário Vila Nova',
      availableSlots: 5,
      image: 'https://placehold.co/600x400/red/white?text=Evento+Comunidade'
    },
    {
      id: 3,
      name: 'Visita ao Asilo',
      date: '25/05/2025',
      time: '15:30',
      location: 'Lar dos Idosos Felizes',
      availableSlots: 8,
      image: 'https://placehold.co/600x400/red/white?text=Evento+Asilo'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Voluntária',
      text: 'Ser voluntária no Nariz Encantado mudou minha vida. Ver o sorriso das crianças é uma experiência única e transformadora.',
      image: 'https://placehold.co/100x100/red/white?text=Maria'
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Voluntário',
      text: 'Participar dos eventos do Nariz Encantado me fez perceber o quanto pequenos gestos podem fazer grande diferença na vida das pessoas.',
      image: 'https://placehold.co/100x100/red/white?text=João'
    },
    {
      id: 3,
      name: 'Ana Oliveira',
      role: 'Enfermeira',
      text: 'Os palhaços do Nariz Encantado trazem alegria e esperança para nossos pacientes. É incrível ver como a atmosfera do hospital muda quando eles chegam.',
      image: 'https://placehold.co/100x100/red/white?text=Ana'
    }
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Nariz Encantado</h1>
            <p className="text-xl text-primary-foreground mb-8">
              Nossa missão é levar alegria e felicidade através da magia do palhaço, com amor, respeito e encantamento. Buscamos transformar momentos e criar memórias inesquecíveis.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-secondary hover:bg-secondary-hover text-white font-bold py-3 px-6 rounded-lg text-center">
                Seja Voluntário
              </Link>
              <Link to="/events" className="bg-white hover:bg-gray-100 text-secondary font-bold py-3 px-6 rounded-lg text-center">
                Ver Eventos
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="/images/logo.svg" alt="Nariz Encantado" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sobre Nós</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="https://placehold.co/600x400/red/white?text=Sobre+Nós" alt="Sobre Nariz Encantado" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-lg mb-6">
                O Nariz Encantado é uma organização sem fins lucrativos dedicada a levar alegria e conforto através da arte do palhaço. Nossos voluntários visitam hospitais, asilos, orfanatos e comunidades carentes, criando momentos de felicidade e alívio.
              </p>
              <p className="text-lg mb-6">
                Acreditamos no poder transformador do riso e da empatia. Cada sorriso que provocamos é uma pequena vitória contra a tristeza e o sofrimento.
              </p>
              <Link to="/about" className="text-secondary hover:text-secondary-hover font-bold">
                Saiba mais sobre nossa história →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                  <div className="mb-4">
                    <p className="text-gray-700"><span className="font-semibold">Data:</span> {event.date} às {event.time}</p>
                    <p className="text-gray-700"><span className="font-semibold">Local:</span> {event.location}</p>
                    <p className="text-gray-700"><span className="font-semibold">Vagas:</span> {event.availableSlots}</p>
                  </div>
                  <Link to={`/events/${event.id}`} className="block bg-secondary hover:bg-secondary-hover text-white text-center font-bold py-2 px-4 rounded">
                    Inscreva-se
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/events" className="inline-block bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3 px-6 rounded-lg">
              Ver Todos os Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="voluntario" className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Seja um Voluntário</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Junte-se a nós e faça a diferença na vida de muitas pessoas! Ser um voluntário do Nariz Encantado é uma experiência transformadora.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-2">Compartilhe Amor</h3>
              <p>Leve carinho e atenção para quem mais precisa.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-xl font-bold mb-2">Espalhe Sorrisos</h3>
              <p>Transforme momentos difíceis em memórias felizes.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Cresça como Pessoa</h3>
              <p>Desenvolva habilidades e expanda seus horizontes.</p>
            </div>
          </div>
          <Link to="/register" className="inline-block bg-white hover:bg-gray-100 text-secondary font-bold py-3 px-6 rounded-lg">
            Quero me Voluntariar
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Depoimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
