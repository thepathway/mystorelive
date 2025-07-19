
//frontend/src/GPTApp.jsx < this file path

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import { useState } from "react";

function Navbar({ onLogout }) {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">MyStore Admin</div>
      <button onClick={onLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={
            isLoggedIn ? <AdminPanel /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/admin" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
