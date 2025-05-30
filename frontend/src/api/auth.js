import api from './axios';

export const loginUser = async (credentials) => {
    const response = await api.post('token/', credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('register/', userData)
    return response.data;
}

export const refreshToken = async (refreshToken) => {
    const response = await api.post('token/refresh/', { refresh: refreshToken });
};

export const logoutUser = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}