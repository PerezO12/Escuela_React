import clienteAxios from "../config/clienteAxios";

export const login = async ( credenciales ) => {
    try {
        const { data } = await clienteAxios.post('/account/login', credenciales);
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors|| error.response?.data?.Errors || "Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente.";
    }
}

export const cargarDatosUsuario = async (config) => {
    try {
        const { data } = await clienteAxios.get('/account/obtener-perfil', config);
        return data.data;
    } catch(error) {
        throw error.response?.data?.errors || error.response?.data?.Errors || "Ocurrió un error.";
    }
}
export const cambiarPassword = async ( passwordActual, passwordNueva ) => {
    try {
        const { data } = await clienteAxios.post("/account/cambiar-password", {
            passwordActual,
            passwordNueva
        });
        return data.data;
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error.";
    }
}
export const cerrarSesion = async () => {
    try {
        const { data } = await clienteAxios.post("/account/logout");
        return data.data;
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error.";
    }
}

export const generarCodigo2FA = async () => {
    try {
        const { data } = await clienteAxios.post("/account/generate-2fa");
        return data.data;
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error.";
    }

}
export const confirmarCodigo = async (code) => {
    try {
        const { data } = await clienteAxios.post("/account/enable-2fa", {code});
        return data.data;
    } catch(error) {
        console.log(error)
        throw error.response?.data?.errors || "Ocurrió un error.";
    }
}
export const desactivar2FA = async (code) => {
    try {
        const { data } = await clienteAxios.post("/account/desactivar-2fa", {code});
        return data.data;
    } catch(error) {
        console.log(error)
        throw error.response?.data?.errors || "Ocurrió un error.";
    }
}

export const validarCodigo = async (code) => {
    try {
        const { data } = await clienteAxios.post("/account/validate-2fa", {code});
        return data.data;
    } catch(error) {
        console.log(error)
        throw error.response?.data?.errors || "Ocurrió un error.";
    }
}