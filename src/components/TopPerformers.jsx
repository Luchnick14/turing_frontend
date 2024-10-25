import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { colors } from '../styles/colorPalette'

const TopPerformers = ({ projectId }) => {
    const [topUsers, setTopUsers] = useState([]);

    const fetchTopUsers = async () => {
        const token = localStorage.getItem('access_token');

        if (!token){
            console.error('No hay token disponible');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/task/top-performers`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectId })
            });

            if (!response.ok){
                throw new Error('Error al obtener los mejores usuarios');
            }

            const data = await response.json();
            const processedTopUsers = data.topPerformers.map(user => ({
                name: user.name,
                lastName: user.lastName,
                role: user.role,
                taskCount: user.completedTasks
            }));

            if (processedTopUsers.length > 1) {
                [processedTopUsers[0], processedTopUsers[1]] = [processedTopUsers[1], processedTopUsers[0]];
            }

            setTopUsers(processedTopUsers);
        } catch (error) {
            console.error('Error al obtener los mejores usuarios', error);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchTopUsers();
        }
    }, [projectId]);

    return (
        <Box>
            <Typography 
                variant="h3"
                sx={{
                    color: colors.accent,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}
            >Top Performers</Typography>
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                gap="2rem"
                sx={{
                    '@media (max-width: 600px)': { 
                            display: 'flex',
                            flexDirection: "column",
                            justifyItems: 'center',
                            alignItems: 'center',
                            width: '100%'
                        },
                }}
            >
                {topUsers.map((user, index) => (
                    <Box key={user.userId} 
                        textAlign="center"
                        display="flex"
                        flexDirection="column"
                        sx={{
                            '@media (max-width: 600px)': { 
                                display: 'flex',
                                flexDirection: "column",
                                justifyItems: 'center',
                                alignItems: 'center',
                                width: '100%'
                            },
                            padding: '1rem',
                        }}
                    >
                        <Avatar 
                            sx={{ 
                                bgcolor: colors.primary, 
                                height: index === 1 ? '13rem' : '10rem', 
                                width: index === 1 ? '13rem' : '10rem',
                                marginBottom: '1rem',
                                '@media (max-width: 600px)': {
                                    height: index === 1 ? '10rem' : '8rem',
                                    width: index === 1 ? '10rem' : '8rem',
                                    marginBottom: '1rem',
                                } 
                            }}
                        >
                            <Typography variant='h3'>
                                {user.name.slice(0,1)}{user.lastName.slice(0,1)}
                            </Typography>
                        </Avatar>
                        <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 'bold' }}>
                            {user.name} {user.lastName}
                        </Typography>
                        <Typography variant="body" sx={{ color: colors.primary }}>
                            Tareas completadas: {user.taskCount}
                        </Typography>
                        <Typography variant="body" sx={{ color: colors.accent, fontWeight: 'bold' }}>
                            Rol: {user.role}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default TopPerformers;