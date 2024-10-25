import React, { useState } from "react";
import { colors } from "../styles/colorPalette";
import { 
    Box, 
    Card, 
    CardContent, 
    CardActions, 
    Button, 
    Typography, 
    Fab, 
    Modal, 
    TextField,
    MenuItem,
    Select,
    InputLabel
} from "@mui/material";

import { fetchProjects } from "../actions/Projects/fetchProjects";
import { addProject }  from "../actions/Projects/addProject";
import { editProject } from "../actions/Projects/editProject";
import { deleteProject } from "../actions/Projects/deleteProject";

import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Projects = ({ onSelectProject }) => {
    const [projects, setProjects] = useState([]);
    const [showProjects, setShowProjects] = useState(false);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [newProjectData, setNewProjectData] = useState({ name: "", description: "", status: ""});

    // Controladores para abrir y cerrar modales
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleOpenEditModal = () => {
        const lastProject = projects[projects.length - 1];
        setSelectedProject(lastProject);
        setNewProjectData({ name: lastProject.name, description: lastProject.description, status: lastProject.status });
        setOpenEditModal(true);
    };
    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleOpenDeleteModal = () => {
        const lastProject = projects[projects.length - 1];
        setSelectedProject(lastProject);
        setOpenDeleteModal(true);
    };
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    //Funciones de acción
    const handleFetchProjects = async () => {
        try {
            const projects = await fetchProjects();
            setProjects(projects);
            setShowProjects(true);
        } catch (error) {
            console.error('Error al obtener los proyectos', error);
        }
    };

    const handleAddProject = async () => {
        try {
            await addProject(newProjectData);
            handleFetchProjects();
            handleCloseAddModal();
        } catch (error) {
            console.error('Error al agregar el proyecto', error);
        }
    };

    const handleEditProject = async () => {
        try {
            await editProject(selectedProject.id, newProjectData);
            handleFetchProjects();
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar el proyecto', error);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(selectedProject.id);
            handleFetchProjects();
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error al eliminar el proyecto', error);
        }
    };

    return (
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
            >Proyectos</Typography>
            
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                sx={{
                    width: '100%',
                    '@media (max-width: 600px)': { 
                        display: 'flex',
                        flexDirection: "column",
                        justifyItems: 'center',
                        alignItems: 'center',
                        width: '100vw',
                        gap: '1rem'
                    },
                }}
            >
                <Button 
                    variant="contained" 
                    onClick={handleFetchProjects} 
                    sx={{ 
                        bgcolor: colors.primary, 
                        color: colors.accent,
                        height: '2.5rem'
                    }}
                >
                    Mostrar proyectos
                </Button>
                <Box
                    sx={{
                        '@media (max-width: 600px)': { 
                            display: 'flex',
                            flexDirection: "column",
                            justifyItems: 'center',
                            alignItems: 'center',
                            gap: '1rem'
                        },
                    }}
                >
                    <Fab 
                        aria-label="add" 
                        variant="extended"
                        onClick={handleOpenAddModal}
                        sx={{
                            margin: '0 1rem 0 0',
                            bgcolor: colors.light,
                            '@media (max-width: 600px)': {
                                margin: '0'
                            }
                        }}
                    >
                        <AddIcon sx={{ marginRight: '0.5rem'}} />
                        <Typography variant="p">
                            Agregar
                        </Typography>
                    </Fab>
                    <Fab  
                        aria-label="edit" 
                        variant="extended"
                        onClick={handleOpenEditModal}
                        sx={{
                            margin: '0 1rem 0 1rem',
                            bgcolor: colors.light,
                            '@media (max-width: 600px)': {
                                margin: '0'
                            }
                        }}
                    >
                        <EditIcon sx={{ marginRight: '0.5rem'}} />
                        <Typography variant="p">
                            Editar
                        </Typography>
                    </Fab>
                    <Fab 
                        aria-label="delete" 
                        variant="extended"
                        onClick={handleOpenDeleteModal}
                        sx={{
                            margin: '0 0 0 1rem',
                            bgcolor: colors.light,
                            '@media (max-width: 600px)': {
                                margin: '0'
                            }
                        }}
                    >
                        <DeleteIcon sx={{ marginRight: '0.5rem'}} />
                        <Typography variant="p">
                            Eliminar
                        </Typography>
                    </Fab>
                </Box>
            </Box>
            
            {showProjects && (
                <Box 
                    sx={{ 
                        display: 'flex',
                        gap: '1.5rem',
                        flexDirection: 'row',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        '@media (max-width: 600px)': { 
                            display: 'flex',
                            flexDirection: "column",
                            justifyItems: 'center',
                            alignItems: 'center',
                            width: '100vw'
                        },
                        padding: '1.5rem',
                    }}
                >
                    {projects.map((project, index) => (
                        <Card
                            key={index}
                            sx={{
                                bgcolor: colors.background2,
                                borderRadius: '0.8rem',
                                border: `0.2rem solid ${colors.primary}`,
                                width: '15rem',
                                margin: '0.3rem'
                            }}
                        >
                            <Box 
                                display={'flex'} 
                                justifyContent={'center'} 
                                alignItems={'center'}
                                height={'11rem'}
                            >
                                <Box
                                    sx={{
                                        bgcolor: colors.primary,
                                        height: "10rem",
                                        width: "93%",
                                        borderRadius: "0.8rem",
                                    }}
                                ></Box>
                            </Box>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold'}}>{project.name}</Typography>
                                <Typography variant="h7">{project.description}</Typography>
                                <Typography variant="h8">Integrantes: {project.membersCount}</Typography>
                                <Typography variant="h8">Estado: {project.status}</Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: colors.accent,
                                        color: colors.primary,
                                        fontWeight: "bold",
                                        width: "50%",
                                    }}
                                    onClick={() => onSelectProject(project.id)}
                                >
                                    Ver Top Performers
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Modal para agregar */}
            <Modal open={openAddModal} onClose={handleCloseAddModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6">Agregar Proyecto</Typography>
                    <TextField 
                        label="Nombre" 
                        value={newProjectData.name} 
                        onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })} fullWidth />
                    <TextField 
                        label="Descripción" 
                        value={newProjectData.description} 
                        onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })} fullWidth />
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={newProjectData.status || ''}
                        label="Status"
                        onChange={(e) => setNewProjectData({ ...newProjectData, status: e.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={handleAddProject} sx={{ mt: 2 }}>Agregar</Button>
                </Box>
            </Modal>

            {/* Modal para editar */}
            <Modal open={openEditModal} onClose={handleCloseEditModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6">Editar Proyecto</Typography>
                    <TextField 
                        label="Nombre" 
                        value={newProjectData.name} 
                        onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })} fullWidth />
                    <TextField 
                        label="Descripción" 
                        value={newProjectData.description} 
                        onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })} fullWidth />
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={newProjectData.status || ''}
                        label="Status"
                        onChange={(e) => setNewProjectData({ ...newProjectData, status: e.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={handleEditProject} sx={{ mt: 2 }}>Guardar Cambios</Button>
                </Box>
            </Modal>

            {/* Modal para eliminar */}
            <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6">¿Estás seguro de que deseas eliminar el último proyecto?</Typography>
                    <Button variant="contained" onClick={handleDeleteProject} color="error" sx={{ mt: 2 }}>Eliminar</Button>
                </Box>
            </Modal>
        </Box>
    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: `0.2rem solid ${colors.primary}`,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
};

export default Projects;
