import React, { useState, useEffect } from 'react';
import TopPerformers from './components/TopPerformers';
import Projects from './components/Projects';
import Users from './components/Users';
import Login from './components/Login';
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si el token existe en localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Actualiza el estado después de un login exitoso
  };

  const handleLogout = () => {
    // Eliminar el token de localStorage para hacer logout
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          {/* Contenido de la app solo visible si está autenticado */}
          <Projects />
          <Users />
          <TopPerformers />
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  )
}

export default App
