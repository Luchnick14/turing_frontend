import React, { useState } from 'react';


const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
                const token = localStorage.getItem('access_token');
                console.log('TOKEN: ', token);
                onLoginSuccess();
            } else {
                const data = await response.json();
                setError(data.message || 'Error en el login');
            }
        } catch (error) {
            console.error('Error en la autenticación', error);
            setError('Hubo un problema en el servidor');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
            />
            <button type="submit">Login</button>
        </form>
    )
};

export default Login;