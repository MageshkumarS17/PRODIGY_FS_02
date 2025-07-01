import { Employee } from '../types';

const EMPLOYEES_KEY = 'employees';

// Sample data
const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 85000,
    hireDate: '2023-01-15',
    status: 'active',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105'
    }
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 987-6543',
    position: 'Product Manager',
    department: 'Product',
    salary: 95000,
    hireDate: '2022-08-20',
    status: 'active',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    }
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 456-7890',
    position: 'UX Designer',
    department: 'Design',
    salary: 75000,
    hireDate: '2023-03-10',
    status: 'active',
    address: {
      street: '789 Pine Rd',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    }
  }
];

export const getEmployees = (): Employee[] => {
  const stored = localStorage.getItem(EMPLOYEES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with sample data
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(SAMPLE_EMPLOYEES));
  return SAMPLE_EMPLOYEES;
};

export const saveEmployees = (employees: Employee[]): void => {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
};

export const addEmployee = (employee: Employee): void => {
  const employees = getEmployees();
  employees.push(employee);
  saveEmployees(employees);
};

export const updateEmployee = (updatedEmployee: Employee): void => {
  const employees = getEmployees();
  const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
  if (index !== -1) {
    employees[index] = updatedEmployee;
    saveEmployees(employees);
  }
};

export const deleteEmployee = (id: string): void => {
  const employees = getEmployees();
  const filtered = employees.filter(emp => emp.id !== id);
  saveEmployees(filtered);
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};