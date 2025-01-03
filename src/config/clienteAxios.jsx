import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});


clienteAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {    
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default clienteAxios;

/* import axios from 'axios';

const token = localStorage.getItem('token');
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
}
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    headers: config.headers
    })


export default clienteAxios; */