
export const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error("No hay token disponible");
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};