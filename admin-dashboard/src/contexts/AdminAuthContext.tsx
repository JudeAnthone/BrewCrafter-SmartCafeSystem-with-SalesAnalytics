import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminUser {
  id: string;
  email: string;
  role: number | string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  loading: boolean;
  stepUpBirthday: (email: string, birthday: string) => Promise<any>;
  stepUpOTP: (email: string, otp: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token: string, user: AdminUser) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const stepUpBirthday = async (email: string, birthday: string) => {
    const res = await fetch('http://localhost:5000/api/auth/stepup-birthday', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, birthday }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Birthday verification failed');
    return data;
  };

  const stepUpOTP = async (email: string, otp: string) => {
    const res = await fetch('http://localhost:5000/api/auth/stepup-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'OTP verification failed');
    // Save user/token after verification
    localStorage.setItem('adminUser', JSON.stringify(data.user));
    localStorage.setItem('adminToken', data.token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, loading, stepUpBirthday, stepUpOTP }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};