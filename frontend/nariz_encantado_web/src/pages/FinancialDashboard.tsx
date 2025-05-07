import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { financialService } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AlertCircle, Check, Upload, FileText, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface FinancialRecord {
  id: number;
  description: string;
  amount: number;
  record_type: 'income' | 'expense';
  document_path: string;
  created_at: string;
}

interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

const FinancialDashboard: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    record_type: 'expense',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }

    const fetchFinancialData = async () => {
      try {
        setIsLoading(true);
        const [recordsData, summaryData] = await Promise.all([
          financialService.getFinancialRecords(),
          financialService.getFinancialSummary()
        ]);
        setRecords(recordsData);
        setMonthlySummary(summaryData);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinancialData();
  }, [isAuthenticated, isAdmin, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Por favor, selecione um arquivo para enviar.');
      return;
    }

    if (!formData.description || !formData.amount) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount)) {
        throw new Error('Valor inválido.');
      }

      const newRecord = await financialService.createFinancialRecord({
        description: formData.description,
        amount,
        record_type: formData.record_type as 'income' | 'expense',
        file
      });

      setRecords((prev) => [newRecord, ...prev]);
      setSuccess(true);
      setFormData({
        description: '',
        amount: '',
        record_type: 'expense',
      });
      setFile(null);

      const summaryData = await financialService.getFinancialSummary();
      setMonthlySummary(summaryData);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao registrar transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600">Carregando dados financeiros...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Módulo Financeiro</h1>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="summary" className="text-lg">Resumo</TabsTrigger>
          <TabsTrigger value="records" className="text-lg">Transações</TabsTrigger>
          <TabsTrigger value="new" className="text-lg">Nova Transação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-600">Entradas Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
                  <span className="text-2xl font-bold text-green-500">
                    {formatCurrency(monthlySummary.reduce((sum, month) => sum + month.income, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-600">Saídas Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingDown className="h-8 w-8 text-red-500 mr-3" />
                  <span className="text-2xl font-bold text-red-500">
                    {formatCurrency(monthlySummary.reduce((sum, month) => sum + month.expense, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-600">Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-blue-500 mr-3" />
                  <span className={`text-2xl font-bold ${monthlySummary.reduce((sum, month) => sum + month.balance, 0) >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                    {formatCurrency(monthlySummary.reduce((sum, month) => sum + month.balance, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Resumo Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySummary}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="income" name="Entradas" fill="#22c55e" />
                    <Bar dataKey="expense" name="Saídas" fill="#ef4444" />
                    <Bar dataKey="balance" name="Saldo" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              {records.length === 0 ? (
                <p className="text-center py-8 text-gray-600">Nenhuma transação registrada.</p>
              ) : (
                <div className="space-y-4">
                  {records.map((record) => (
                    <div key={record.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start md:items-center mb-3 md:mb-0">
                        {record.record_type === 'income' ? (
                          <TrendingUp className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium">{record.description}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(record.created_at), "PPP", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                        <span className={`font-bold ${record.record_type === 'income' ? 'text-green-500' : 'text-red-500'} md:mr-6`}>
                          {record.record_type === 'income' ? '+' : '-'} {formatCurrency(record.amount)}
                        </span>
                        <a 
                          href={`${API_URL}/${record.document_path}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-600 hover:underline flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          <span>Comprovante</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Registrar Nova Transação</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">Transação registrada com sucesso!</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descreva a transação"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Tipo de Transação</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="expense"
                        name="record_type"
                        value="expense"
                        checked={formData.record_type === 'expense'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <Label htmlFor="expense" className="cursor-pointer">Saída</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="income"
                        name="record_type"
                        value="income"
                        checked={formData.record_type === 'income'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <Label htmlFor="income" className="cursor-pointer">Entrada</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document">Comprovante</Label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label 
                        htmlFor="document"
                        className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-300 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {file ? file.name : 'Clique para selecionar arquivo'}
                          </span>
                        </div>
                        <input
                          id="document"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processando...' : 'Registrar Transação'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialDashboard;
