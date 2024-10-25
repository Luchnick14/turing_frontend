import { getAuthHeaders } from '../../utils/getAuthHeaders';

const API_URL = `${import.meta.env.VITE_API_URL}/project`;

export const addProject = async (project) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(project)
    });

    if (!response.ok) throw new Error('Error al agregar el proyecto');
    return await response.json();
};