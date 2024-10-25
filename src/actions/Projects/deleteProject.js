import { getAuthHeaders } from '../../utils/getAuthHeaders';

const API_URL = `${import.meta.env.VITE_API_URL}/project`;

export const deleteProject = async (projectId) => {
    const response = await fetch(`${API_URL}/delete`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ projectId })
    });

    if (!response.ok) throw new Error('Error al eliminar el proyecto');
    return await response.json();
};