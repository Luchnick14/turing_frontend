import React, { useState } from "react";
import { colors } from "../styles/colorPalette"; 
import { Box, Typography, Button } from "@mui/material"; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);

    const fetchUsers= async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            console.error('No hay token disponible');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok){
                throw new Error('Error al obtener los usuarios');
            }

            const data = await response.json();
            const processedUsers = data.users.map(user => ({
                name: user.name,
                lastName: user.lastName,
                role: user.role
            }));

            setUsers(processedUsers);
            setShowUsers(true);
        } catch (error) {
            console.error('Error al obtener los proyectos', error);
        }
    }

    return(
        <Box mb={"8rem"}>
            <Typography
                variant="h3"
                sx={{
                    color: colors.accent,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '2rem',
                    marginBottom: '2rem'
                }}
            >Users</Typography>

        
            <Button 
                variant="contained" 
                onClick={fetchUsers} 
                sx={{ 
                    bgcolor: colors.primary, 
                    color: colors.accent,
                    height: '2.5rem',
                    marginBottom: "2rem"
                }}
            >
                Mostrar usuarios
            </Button>
            
            

            {showUsers && (
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1.5rem',
                        '@media (max-width: 600px)': {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100vw'
                        },
                        padding: '1rem'
                    }}
                >
                    {users.map((user, index) => (
                        <Box
                            key={index}
                            sx={{ 
                                height: '13rem', 
                                width: '20rem', 
                                bgcolor: colors.accent, 
                                borderRadius: '0.8rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '1rem'
                            }} 
                            display={'flex'} 
                            justifyContent={'center'} 
                            alignItems={'center'}
                        >
                            <Typography 
                                variant="h5" 
                                gutterBottom 
                                sx={{ 
                                    color: colors.primary, 
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                    {user.name} {user.lastName}</Typography>
                            <Typography 
                                variant="h6" 
                                gutterBottom 
                                sx={{ 
                                    color: colors.primary, 
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>{user.role}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
};

export default Users;