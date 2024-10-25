import { getAuthHeaders } from '../../utils/getAuthHeaders';

const API_URL = `${import.meta.env.VITE_API_URL}/project`;

export const fetchProjects = async () => {
    const response = await fetch(`${API_URL}/list`, {
        method: 'GET',
        headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error('Error al obtener los proyectos');
    const data = await response.json();
    return data.projects.map(project => ({
        id: project._id,
        name: project.name,
        description: project.description,
        membersCount: project.users.length,
        status: project.status
    }));
};