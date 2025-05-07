import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { AlertCircle, Check, Plus, Pencil, Trash2, Link, Copy, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { eventService } from '../../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Calendar as CalendarComponent } from '../../components/ui/calendar';

interface Event {
  id: number;
  name: string;
  date_time: string;
  location: string;
  total_spots: number;
  available_spots: number;
  description: string;
  image_path: string | null;
  registration_link: string | null;
  created_at: string;
}

const AdminEventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const [eventData, setEventData] = useState({
    name: '',
    date_time: new Date(),
    location: '',
    total_spots: 10,
    available_spots: 10,
    description: '',
  });
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      setError(err.response?.data?.detail || 'Erro ao carregar eventos.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setEventData(prev => ({ ...prev, date_time: date }));
    }
  };
  
  const resetForm = () => {
    setEventData({
      name: '',
      date_time: new Date(),
      location: '',
      total_spots: 10,
      available_spots: 10,
      description: '',
    });
    setDate(new Date());
  };
  
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await eventService.createEvent({
        ...eventData,
        date_time: eventData.date_time.toISOString(),
      });
      setSuccess('Evento criado com sucesso!');
      resetForm();
      setIsCreateDialogOpen(false);
      fetchEvents();
    } catch (err: any) {
      console.error('Error creating event:', err);
      setError(err.response?.data?.detail || 'Erro ao criar evento.');
    }
  };
  
  const handleEditEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!selectedEvent) return;
    
    try {
      await eventService.updateEvent(selectedEvent.id, {
        ...eventData,
        date_time: eventData.date_time.toISOString(),
      });
      setSuccess('Evento atualizado com sucesso!');
      resetForm();
      setIsEditDialogOpen(false);
      fetchEvents();
    } catch (err: any) {
      console.error('Error updating event:', err);
      setError(err.response?.data?.detail || 'Erro ao atualizar evento.');
    }
  };
  
  const handleDeleteEvent = async () => {
    setError('');
    setSuccess('');
    
    if (!selectedEvent) return;
    
    try {
      await eventService.deleteEvent(selectedEvent.id);
      setSuccess('Evento excluído com sucesso!');
      setIsDeleteDialogOpen(false);
      fetchEvents();
    } catch (err: any) {
      console.error('Error deleting event:', err);
      setError(err.response?.data?.detail || 'Erro ao excluir evento.');
    }
  };
  
  const handleGenerateLink = async (eventId: number) => {
    setError('');
    setSuccess('');
    
    try {
      await eventService.generateRegistrationLink(eventId);
      setSuccess('Link de inscrição gerado com sucesso!');
      fetchEvents();
    } catch (err: any) {
      console.error('Error generating link:', err);
      setError(err.response?.data?.detail || 'Erro ao gerar link de inscrição.');
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('Link copiado para a área de transferência!');
  };
  
  const openEditDialog = (event: Event) => {
    setSelectedEvent(event);
    setEventData({
      name: event.name,
      date_time: new Date(event.date_time),
      location: event.location,
      total_spots: event.total_spots,
      available_spots: event.available_spots,
      description: event.description || '',
    });
    setDate(new Date(event.date_time));
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gerenciamento de Eventos</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Evento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Evento</Label>
                <Input
                  id="name"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Data e Hora</Label>
                <div className="flex flex-col space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Local</Label>
                <Input
                  id="location"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_spots">Total de Vagas</Label>
                  <Input
                    id="total_spots"
                    name="total_spots"
                    type="number"
                    min="1"
                    value={eventData.total_spots}
                    onChange={handleNumberInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="available_spots">Vagas Disponíveis</Label>
                  <Input
                    id="available_spots"
                    name="available_spots"
                    type="number"
                    min="0"
                    max={eventData.total_spots}
                    value={eventData.available_spots}
                    onChange={handleNumberInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Criar Evento
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
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
        
        {isLoading ? (
          <div className="text-center py-8">
            <p>Carregando eventos...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Vagas</TableHead>
                <TableHead>Link de Inscrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Nenhum evento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{format(new Date(event.date_time), "dd/MM/yyyy HH:mm", { locale: ptBR })}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.available_spots}/{event.total_spots}</TableCell>
                    <TableCell>
                      {event.registration_link ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs truncate max-w-[150px]">{event.registration_link}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(event.registration_link || '')}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleGenerateLink(event.id)}
                          className="text-xs"
                        >
                          <Link className="h-3 w-3 mr-1" />
                          Gerar Link
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openEditDialog(event)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openDeleteDialog(event)}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
      
      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditEvent} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome do Evento</Label>
              <Input
                id="edit-name"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Data e Hora</Label>
              <div className="flex flex-col space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-location">Local</Label>
              <Input
                id="edit-location"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-total_spots">Total de Vagas</Label>
                <Input
                  id="edit-total_spots"
                  name="total_spots"
                  type="number"
                  min="1"
                  value={eventData.total_spots}
                  onChange={handleNumberInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-available_spots">Vagas Disponíveis</Label>
                <Input
                  id="edit-available_spots"
                  name="available_spots"
                  type="number"
                  min="0"
                  max={eventData.total_spots}
                  value={eventData.available_spots}
                  onChange={handleNumberInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Salvar Alterações
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Event Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza que deseja excluir o evento "{selectedEvent?.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminEventManagement;
