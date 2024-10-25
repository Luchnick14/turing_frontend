import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { colors } from './styles/colorPalette';

import TopPerformers from './components/TopPerformers';
import Projects from './components/Projects';
import Users from './components/Users';
import Login from './components/Login';

import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              bgcolor: colors.accent,
              color: colors.primary,
              fontWeight: "bold",
            }}
          >Logout</Button>
          
          <Projects onSelectProject={setSelectedProjectId}/>
          <Users />
          {selectedProjectId && <TopPerformers projectId={selectedProjectId}/>}
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  )
}

export default App
