export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'hr';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: string;
  hireDate: string;
  status: 'active' | 'inactive';
  street: string;
  city: string;
  state: string;
  zipCode: string;
}