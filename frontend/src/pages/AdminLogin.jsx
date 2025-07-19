//frontend/src/pages/AdminLogin.jsx < this file path

import { useState } from 'react';
import axios from 'axios';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(); // redirect or refresh state
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto mt-10 shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input type="email" placeholder="Email" className="mb-2 p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="mb-2 p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
