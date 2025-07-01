import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Building, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Employee } from '../types';
import { getEmployees } from '../utils/storage';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    departments: [...new Set(employees.map(emp => emp.department))].length,
    averageSalary: employees.length > 0 
      ? Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length)
      : 0
  };

  const recentHires = employees
    .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
    .slice(0, 5);

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your employee management system</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">Active workforce</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.active}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">
              {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% of total
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.departments}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Across organization</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Salary</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.averageSalary.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Annual compensation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Hires */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Hires</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentHires.map((employee) => (
              <div key={employee.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </div>
            ))}
            {recentHires.length === 0 && (
              <p className="text-gray-500 text-center py-8">No employees found</p>
            )}
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Department Distribution</h2>
            <Building className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {Object.entries(departmentCounts).map(([department, count]) => (
              <div key={department} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{department}</span>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 rounded-full h-2 w-24">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / employees.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
            {Object.keys(departmentCounts).length === 0 && (
              <p className="text-gray-500 text-center py-8">No departments found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;