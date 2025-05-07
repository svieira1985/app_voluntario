import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Upload, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface Document {
  id: number;
  document_type: string;
  file_path: string;
  uploaded_at: string;
}

interface DocumentUploadProps {
  title: string;
  documentType: string;
  onUpload: (documentType: string, file: File) => Promise<void>;
  existingDocument?: Document;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  title, 
  documentType, 
  onUpload,
  existingDocument 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo para enviar.');
      return;
    }

    setIsUploading(true);
    setError('');
    
    try {
      await onUpload(documentType, file);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao enviar documento. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      
      {existingDocument ? (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-green-600" />
            <span>Documento enviado</span>
          </div>
          <a 
            href={`${API_URL}/${existingDocument.file_path}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-600 hover:underline"
          >
            Visualizar
          </a>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4">
            {error && (
              <Alert variant="destructive" className="mb-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mb-3 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">Documento enviado com sucesso!</AlertDescription>
              </Alert>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label 
                  htmlFor={`file-upload-${documentType}`}
                  className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-300 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {file ? file.name : 'Clique para selecionar arquivo'}
                    </span>
                  </div>
                  <input
                    id={`file-upload-${documentType}`}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isUploading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;
