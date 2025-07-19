//frontend/src/hooks/useAuth.js < this file path

import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const customerNumber = localStorage.getItem('customerNumber');

    if (savedToken && role) {
      setToken(savedToken);
      setUser({ role, customerNumber });
    }
  }, []);

  const login = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('customerNumber', user.customerNumber);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('customerNumber');
    setToken(null);
    setUser(null);
  };

  return { user, token, login, logout };
}
