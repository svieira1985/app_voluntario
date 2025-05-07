import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { uploadDocument } from '../../services/api';

type DocumentType = 'vaccination' | 'id' | 'contract';

interface DocumentStatus {
  vaccination: boolean;
  id: boolean;
  contract: boolean;
}

const DocumentUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>('vaccination');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({
    vaccination: false,
    id: false,
    contract: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadSuccess(false);
      setUploadError('');
    }
  };

  const handleDocumentTypeChange = (type: DocumentType) => {
    setDocumentType(type);
    setUploadSuccess(false);
    setUploadError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Por favor, selecione um arquivo para upload.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError('');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUploadSuccess(true);
      setDocumentStatus(prev => ({
        ...prev,
        [documentType]: true,
      }));
      setSelectedFile(null);
    } catch (err) {
      console.error('Error uploading document:', err);
      setUploadError('Erro ao fazer upload do documento. Por favor, tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const documentTypeLabels: Record<DocumentType, string> = {
    vaccination: 'Comprovante de Vacinação',
    id: 'RG/Documento de Identidade',
    contract: 'Contrato Assinado',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`cursor-pointer ${documentType === 'vaccination' ? 'border-primary' : ''}`} onClick={() => handleDocumentTypeChange('vaccination')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Comprovante de Vacinação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              {documentStatus.vaccination ? (
                <div className="text-green-500 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mt-1">Enviado</span>
                </div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer ${documentType === 'id' ? 'border-primary' : ''}`} onClick={() => handleDocumentTypeChange('id')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">RG/Documento de Identidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              {documentStatus.id ? (
                <div className="text-green-500 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mt-1">Enviado</span>
                </div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer ${documentType === 'contract' ? 'border-primary' : ''}`} onClick={() => handleDocumentTypeChange('contract')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contrato Assinado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              {documentStatus.contract ? (
                <div className="text-green-500 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="mt-1">Enviado</span>
                </div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload de {documentTypeLabels[documentType]}</CardTitle>
          <CardDescription>
            Faça o upload do seu {documentTypeLabels[documentType].toLowerCase()} em formato PDF, JPG ou PNG.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {uploadSuccess && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Documento enviado com sucesso!
              </AlertDescription>
            </Alert>
          )}
          
          {uploadError && (
            <Alert className="mb-4 bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">{uploadError}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document-upload">Selecione o arquivo</Label>
              <Input
                id="document-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            
            {selectedFile && (
              <div className="text-sm">
                <p>Arquivo selecionado: <span className="font-medium">{selectedFile.name}</span></p>
                <p>Tamanho: <span className="font-medium">{(selectedFile.size / 1024).toFixed(2)} KB</span></p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading}
            className="w-full bg-secondary text-white hover:bg-secondary-hover"
          >
            {isUploading ? 'Enviando...' : 'Enviar Documento'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DocumentUpload;
