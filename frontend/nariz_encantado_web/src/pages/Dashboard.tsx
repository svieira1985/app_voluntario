import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DocumentUpload from '../components/volunteer/DocumentUpload';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface UserEvent {
  event: {
    id: number;
    name: string;
    date_time: string;
    location: string;
    image_path: string;
  };
  registered_at: string;
}

interface Document {
  id: number;
  document_type: string;
  file_path: string;
  uploaded_at: string;
}

const Dashboard: React.FC = () => {
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const [eventsData, documentsData] = await Promise.all([
          userService.getUserEvents(),
          userService.getUserDocuments()
        ]);
        setUserEvents(eventsData);
        setDocuments(documentsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  const handleDocumentUpload = async (documentType: string, file: File) => {
    try {
      const uploadedDocument = await userService.uploadDocument(documentType, file);
      setDocuments((prev) => {
        const exists = prev.some(doc => doc.document_type === documentType);
        if (exists) {
          return prev.map(doc => 
            doc.document_type === documentType ? uploadedDocument : doc
          );
        } else {
          return [...prev, uploadedDocument];
        }
      });
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Área do Voluntário</h1>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Carregando dados...</p>
        </div>
      ) : (
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="events" className="text-lg">Meus Eventos</TabsTrigger>
            <TabsTrigger value="documents" className="text-lg">Meus Documentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-600">Você ainda não está inscrito em nenhum evento.</p>
                  <Button 
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => navigate('/#eventos')}
                  >
                    Ver Eventos Disponíveis
                  </Button>
                </div>
              ) : (
                userEvents.map((userEvent, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={userEvent.event.image_path || "https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                        alt={userEvent.event.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-red-600">{userEvent.event.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{format(new Date(userEvent.event.date_time), "PPP 'às' HH:mm", { locale: ptBR })}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="h-5 w-5 mr-2" />
                        <span>Inscrito em: {format(new Date(userEvent.registered_at), "PPP", { locale: ptBR })}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">Documentos Enviados</CardTitle>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <p className="text-gray-600">Nenhum documento enviado ainda.</p>
                  ) : (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-red-600" />
                            <div>
                              <p className="font-medium">
                                {doc.document_type === 'vaccination_proof' && 'Comprovante de Vacinação'}
                                {doc.document_type === 'id_card' && 'RG'}
                                {doc.document_type === 'signed_contract' && 'Contrato Assinado'}
                              </p>
                              <p className="text-sm text-gray-500">
                                Enviado em: {format(new Date(doc.uploaded_at), "PPP", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <a 
                            href={`${API_URL}/${doc.file_path}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-red-600 hover:underline"
                          >
                            Visualizar
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">Enviar Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <DocumentUpload 
                      title="Comprovante de Vacinação" 
                      documentType="vaccination_proof" 
                      onUpload={handleDocumentUpload}
                      existingDocument={documents.find(doc => doc.document_type === 'vaccination_proof')}
                    />
                    
                    <DocumentUpload 
                      title="RG" 
                      documentType="id_card" 
                      onUpload={handleDocumentUpload}
                      existingDocument={documents.find(doc => doc.document_type === 'id_card')}
                    />
                    
                    <DocumentUpload 
                      title="Contrato Assinado" 
                      documentType="signed_contract" 
                      onUpload={handleDocumentUpload}
                      existingDocument={documents.find(doc => doc.document_type === 'signed_contract')}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Dashboard;
