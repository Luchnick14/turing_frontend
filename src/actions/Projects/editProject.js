import { getAuthHeaders } from '../../utils/getAuthHeaders';

const API_URL = `${import.meta.env.VITE_API_URL}/project`;

export const editProject = async (projectId, projectData) => {
    const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            projectId,
            ...projectData
        })
    });

    if (!response.ok) throw new Error('Error al editar el proyecto');
    return await response.json();
};