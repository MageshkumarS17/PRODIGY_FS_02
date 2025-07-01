import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Employee } from './types';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setCurrentView('edit');
  };

  const handleSaveEmployee = () => {
    setEditingEmployee(null);
    setCurrentView('employees');
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
    setCurrentView('employees');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeList onEditEmployee={handleEditEmployee} />;
      case 'add':
        return (
          <EmployeeForm
            onSave={handleSaveEmployee}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      case 'edit':
        return (
          <EmployeeForm
            employee={editingEmployee}
            onSave={handleSaveEmployee}
            onCancel={handleCancelEdit}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;