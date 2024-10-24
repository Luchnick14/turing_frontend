import React, { useEffect, useState } from "react";
import { colors } from "../styles/colorPalette";
import { Box, Card, CardContent, CardActions, Button } from "@mui/material";
import Divider from '@mui/material/Divider';

const Projects = () => {
    const [projects, setProjects] = useState([{
        name: '',
        description: '',
        membersCount: 0
    }]);

    useEffect(() => {
        const fetchProjects = async () => {
            console.log(localStorage.getItem('accessToken'));
            const token = localStorage.getItem('accessToken');

            if (!token) {
                console.error('No hay token disponible');
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/project/list`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los proyectos');
                }
                
                const data = await response.json();
                const processedProjects = data.projects.map(project => ({
                    name: project.name,
                    description: project.description,
                    membersCount: project.users.length
                }));
                
                setProjects(processedProjects);
            } catch (error) {
                console.error('Error al obtener los proyectos', error);
            }
        };
        
        fetchProjects();
    }, [])
    

    return (
        <Box mb={"8rem"}>
            <h1>Proyectos</h1>
            <Box 
            sx={{ 
                hdisplay: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))',
                '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
                padding: '1rem',
            }}>
                {projects.map((project, index) => {
                    <Card
                        key={index}
                        sx={{
                            bgcolor: colors.background2,
                            borderRadius: '0.8rem',
                            border: `0.2rem solid ${colors.primary}`,
                            maxWidth: "20rem",
                            margin: "auto"
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: colors.primary,
                                height: "10rem",
                                width: "100%",
                                borderRadius: "0.8rem 0.8rem 0 0",
                            }}
                        ></Box>
                        <CardContent>
                            <h2>{project.name}</h2> {/* Nombre del Proyecto */}
                            <h3>{project.description}</h3> {/* Descripción */}
                            <h4>Integrantes: {project.memberscount}</h4> {/* Número de Integrantes */}
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: colors.accent,
                                    color: colors.primary,
                                    fontWeight: "bold",
                                    width: "100%",
                                }}
                            >
                                Agregar Integrantes
                            </Button>
                        </CardActions>
                    </Card>
                })}
            </Box>
        </Box>
    );
}

export default Projects;