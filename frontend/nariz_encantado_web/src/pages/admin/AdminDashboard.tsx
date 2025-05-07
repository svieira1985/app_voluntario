import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import AdminUserManagement from '../../components/admin/AdminUserManagement';
import AdminEventManagement from '../../components/admin/AdminEventManagement';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Painel Administrativo</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="events" className="text-lg">Eventos</TabsTrigger>
          <TabsTrigger value="users" className="text-lg">Usuários</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <AdminEventManagement />
        </TabsContent>
        
        <TabsContent value="users">
          <AdminUserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
