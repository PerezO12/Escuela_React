import clienteAxios from "../config/clienteAxios";

export const login = async ( credenciales ) => {
    try {
        const { data } = await clienteAxios.post('/account/login', credenciales);
        return data.data;
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        throw error.response?.data?.errors || "Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente.";
    }
}

export const cargarDatosUsuario = async (config) => {
    try {
        const { data } = await clienteAxios.get('/account/obtener-perfil', config);
        return data.data;
    } catch(error) {
        throw error.response.data || "Ocurrió un error.";
    }
}