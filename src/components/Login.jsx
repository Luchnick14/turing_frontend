import { Box, Button, Typography, Card, CardContent, CardActions, TextField } from '@mui/material';
import React, { useState } from 'react';
import { colors } from '../styles/colorPalette';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            if (response.ok){
                localStorage.setItem('access_token', data.token);
                onLoginSuccess();
            } else {
                if (!data.msg){
                    const errorMessage = data.errors && data.errors.length > 0
                        ? data.errors[0].msg
                        : 'Error en el Login'
                    setLoginError(errorMessage);
                } else {
                    setLoginError(data.msg)
                }
            }
        } catch (error) {
            console.error('Error en la autenticación', error);
            setLoginError('Hubo un problema en el servidor');
        }
    }

    return (
        <Box
            mt={'5rem'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Card
                sx={{
                    bgcolor: colors.background2,
                    border: `0.2rem solid ${colors.primary}`,
                    borderRadius: '0.8rem',
                    width: '20rem'
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        component={'form'}
                        onSubmit={handleSubmit}
                    >
                        <Typography 
                            variant='h3'
                            sx={{
                                color: colors.primary,
                                marginBottom: '2rem'
                            }}
                        >Login</Typography>
                        {loginError && 
                        <Typography 
                            variant='p'
                            sx={{ 
                                color: 'red',
                                fontWeight: 'bold',
                                margin: '1rem'
                            }}
                        >{loginError}</Typography>}
                        <TextField 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            label="Email" 
                            required
                            variant='outlined'
                            sx={{
                                marginBottom: '1rem',
                                width: '90%'
                            }}
                        />
                        <TextField 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            label="Password"
                            required 
                            variant='outlined'
                            sx={{
                                marginBottom: '1rem',
                                width: '90%'
                            }}
                        />
                        <CardActions>
                            <Button 
                                type='submit'
                                variant="contained"
                                sx={{
                                    bgcolor: colors.accent,
                                    color: colors.primary,
                                    fontWeight: "bold",
                                    width: "5rem",
                                }}
                            >Login</Button>
                        </CardActions>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
};

export default Login;